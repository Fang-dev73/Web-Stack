import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/Layout/AdminLayout"
import { Row, Col, List, Avatar, Space, Input } from "antd"
import axios from "axios";
import { toast } from "react-hot-toast";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth";
import Link from "next/link";
import user from "../../../../server/models/user";

export default function AllUsers() {
    const [auth, setAuth] = useContext(AuthContext);
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        if (auth?.token) loadUsers();
    }, [auth?.token])

    const loadUsers = async (req, res) => {
        try {
            const { data } = await axios.get("users");
            console.log(data);
            setUsers(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (user) => {
        try {
            if (user?._id === auth?.user?._id) {
                alert("You cannot remove yourself");
                return;
            }
            try {
                const { data } = await axios.delete(`/user/${user._id}`);
                setUsers((prev) => prev.filter((u) => u._id !== user._id));
                toast.success("User deleted successfully");
            }
            catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(keyword));

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <Space style={{width: "100%", marginBottom: 30, marginTop: 20}}>
                        <h1 style={{fontFamily: "cursive", marginLeft: 10}}><b>{(users.length)}</b> Posts</h1>
                        <h2 style={{fontFamily: "cursive", marginLeft: 420}}><b>All Users</b></h2>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search"
                            bordered
                            style={{ borderRadius: 20, marginLeft: 400, width: 150, fontFamily: "cursive" }}
                            type="search"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value.toLowerCase())}
                        />
                    </Space>
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredUsers}
                        renderItem={(user) => (
                            <List.Item
                                style={{fontFamily: "cursive"}}
                                actions={[
                                    <Link href={`/admin/users/${user._id}`} legacyBehavior>
                                        <a>edit</a>
                                    </Link>,
                                    <a
                                        disabled={user?._id === auth?.user?._id}
                                        onClick={() => handleDelete(user)}>delete</a>
                                ]}>
                                <Avatar style={{fontFamily: "cursive"}} src={user?.image?.url}>{user?.name[0]}</Avatar>
                                <List.Item.Meta style={{ marginLeft: 10, fontFamily: "cursive"}} title={user.name} />
                                <List.Item.Meta style={{fontFamily: "cursive"}} description={user.email} />
                                <List.Item.Meta style={{fontFamily: "cursive"}} description={user.role} />
                                <List.Item.Meta style={{fontFamily: "cursive"}} description={`${user?.posts?.length || 0} post`} />
                            </List.Item>
                        )} />
                </Col>
            </Row>
        </AdminLayout>
    )
} 