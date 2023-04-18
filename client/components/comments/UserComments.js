import { Button, Row, Col, List, Input, Space, Modal } from "antd";
import Link from "next/link";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import dayjs from "dayjs";
import CommentForm from "./CommentForm"

import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)

function UserComments() {
    const [auth, setAuth] = useContext(AuthContext);
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [selectedComment, setSelectedComment] = useState({});
    const [content, setContent] = useState("");
    const [visible, setVisible] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (auth?.token) {
            fetchComments();
        }
    }, [auth?.token])

    const fetchComments = async () => {
        try {
            const { data } = await axios.get(`/user-comments`);
            setComments(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async () => {
        try {
            const { data } = await axios.put(`/comment/${selectedComment._id}`, { content });
            let arr = comments;
            const index = arr.findIndex((c) => c._id === selectedComment._id);
            arr[index].content = data.content;
            setComments(arr);
            toast.success("Comment Updated")
            setVisible(false);
            setSelectedComment({})
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (comment) => {
        try {
            const answer = window.confirm("Are you sure you want to delete this comment?");
            if (!answer) return;
            const { data } = await axios.delete(`/comment/${comment._id}`);
            if (data?.ok) {
                setComments(comments.filter((c) => c._id !== comment._id));
                setTotal(total - 1);
                toast.success("Comment deleted successfully");
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const filteredComments = comments?.filter((comment) => comment.content.toLowerCase().includes(keyword))

    return (
        <>
            <Row>
                <Col span={24}>
                    <Space style={{ width: "100%", marginBottom: 20 }}>
                        <h1 style={{ marginTop: 30, fontFamily: "cursive" }}>
                            <b>{comments.length}</b> Comments</h1>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search"
                            bordered
                            style={{
                                borderRadius: 20,
                                marginLeft: 950,
                                marginTop: 20,
                                width: 150,
                                fontFamily: "cursive"
                            }}
                            type="search"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value.toLowerCase())}
                        />
                    </Space>
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredComments}
                        style={{ fontFamily: "cursive" }}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Link
                                        href={`/post/${item.postId.slug}#${item._id}`}
                                        legacyBehavior>
                                        <a>view</a>
                                    </Link>,
                                    <a
                                        onClick={() => {
                                            setSelectedComment(item);
                                            setVisible(true);
                                            setContent(item.content);
                                        }}>edit
                                    </a>,
                                    <a onClick={() => handleDelete(item)}>delete</a>
                                ]}>
                                <List.Item.Meta
                                    description={`Post: ${item?.postId?.title} | 
                                    ${item?.postedBy?.name} | 
                                    ${dayjs(item.createdAt).format("L LT")}`}
                                    title={item.content} />
                            </List.Item>
                        )} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Modal
                        open={visible}
                        title="Update Comment"
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        footer={null}
                    >
                        <CommentForm
                            handleSubmit={handleSubmit}
                            comment={content}
                            setComment={setContent}
                            loading={loading} />
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

export default UserComments;