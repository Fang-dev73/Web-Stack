import { Button, Row, Col, List, Input, Space } from "antd";
import AdminLayout from "../../../components/Layout/AdminLayout";
import Link from "next/link";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { PostContext } from "../../../context/post";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import PostsList from "../../../components/posts/PostsList";
import { AuthContext } from "../../../context/auth";

function Posts() {
    const [post, setPost] = useContext(PostContext);
    const [auth, setAuth] = useContext(AuthContext);
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    const { posts } = post;

    useEffect(() => {
        if (auth?.token) fetchPosts();
    }, [auth?.token])

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('/posts-for-admin');
            setPost(prev => ({ ...prev, posts: data }));
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleEdit = async (post) => {
        return router.push(`/admin/posts/${post.slug}`);
    }

    const handleDelete = async (post) => {
        try {
            const answer = window.confirm("Are you sure you want to Delete this post?");
            if (!answer) return;
            const { data } = await axios.delete(`/post/${post._id}`);
            if (data.ok) {
                setPost((prev) => ({
                    ...prev, posts: prev.posts.filter((p) => (p._id !== post._id))
                }))
                toast.success("Post Deleted Successfully")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <Space style={{ width: "100%", marginBottom: 30 }}>
                    <h1 style={{marginTop: 30, fontFamily: "cursive"}}><b>{posts.length}</b> Posts</h1>
                        <Button type="primary"
                            size='large'
                            style={{
                                borderRadius: 10, fontFamily: "cursive", marginLeft: 400, marginTop: 25,
                                flexDirection: "row"
                            }}
                        >
                            <Link href="/admin/posts/new" legacyBehavior>
                                <a><PlusOutlined /> Add New</a>
                            </Link>
                        </Button>

                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search"
                            bordered
                            style={{ borderRadius: 20, marginLeft: 400, marginTop: 20, width: 150, fontFamily: "cursive" }}
                            type="search"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value.toLowerCase())}
                        />
                    </Space>

                    <PostsList
                        posts={posts?.filter((p) => p.title.toLowerCase().includes(keyword))}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </Col>
            </Row>
        </AdminLayout>
    );
}

export default Posts;