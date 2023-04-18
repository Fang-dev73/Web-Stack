import { Button, Row, Col, List } from "antd";
import AuthorLayout from "../../../components/Layout/AuthorLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { PostContext } from "../../../context/post";
import { toast, Toast } from "react-hot-toast";
import { useRouter } from "next/router";
import PostsList from "../../../components/posts/PostsList";

function Posts() {
    const [post, setPost] = useContext(PostContext);
    const router = useRouter();

    const { posts } = post;

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('/posts-by-author')
            setPost(prev => ({ ...prev, posts: data }));
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleEdit = async (post) => {
        return router.push(`/author/posts/${post.slug}`);
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
        <AuthorLayout>
            <Row>
                <Col span={24}>
                    <Button type="primary"
                        size='large'
                        style={{
                            borderRadius: 10, fontFamily: "cursive", marginLeft: 200, marginTop: 25
                        }}
                    >
                        <Link href="/author/posts/new" legacyBehavior>
                            <a><PlusOutlined /> Add New</a>
                        </Link>
                    </Button>
                    <h1>{posts.length} Posts</h1>
                    <PostsList
                        posts={posts}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete} 
                    />
                </Col>
            </Row>
        </AuthorLayout>
    );
}

export default Posts;