import axios from "axios";
import React, { useContext, useState } from "react";
import { Row, Col, Card, Typography, List, Avatar, Divider, Button } from 'antd'
import Head from "next/head";
import dayjs from "dayjs"
import Editor from "rich-markdown-editor"
import Link from "next/link";
import { ThemeContext } from "../../context/theme";
import CommentForm from "../../components/comments/CommentForm";
import { ShareSocial } from "react-share-social";
import { toast } from "react-hot-toast"
import { useCategory } from "../../hooks/useCategory";
import { useLatestPosts } from "../../hooks/useLatestPosts";

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const { Meta } = Card;
const { Title } = Typography;

export const SinglePost = ({ post, postComments }) => {
    const [theme, setTheme] = useContext(ThemeContext)
    const [comments, setComments] = useState(postComments);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const { categories } = useCategory();
    const { latestPosts } = useLatestPosts();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/comment/${post._id}`, { comment });
            setComments([data, ...comments]);
            setComment("");
            toast.success("Comment added successfully")
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta description={post.content.substring(0, 100)} />
            </Head>
            <Row>
                <Col xs={24} xl={16}>
                    <Card cover={
                        <img
                            style={{ marginLeft: 20 }}
                            src={post?.featuredImage?.url || '/images/default.jpg'}
                            alt={post.title} />
                    }>
                        <Title>{post.title}</Title>
                        <p style={{ fontFamily: "cursive" }}>
                            <h3>
                                {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")}
                                / 0 Comments / in {post?.categories.map((c) => (
                                    <span key={c._id}>
                                        <Link href={`/category/${c.slug}`}
                                            legacyBehavior>
                                            <a>{c.name}</a>
                                        </Link>
                                    </span>
                                ))}
                            </h3>
                        </p>

                        {/* social share */}
                        <div style={{ marginBottom: 25, height: 100, overflow: "hidden" }}>
                            <ShareSocial
                                url={process.browser && window.location.href}
                                socialTypes={["facebook", "twitter", "reddit", "linkedin", "whatsapp"]} />
                        </div>
                        <Editor
                            defaultValue={post.content}
                            dark={theme === "light" ? false : true}
                            readOnly={true}
                        />
                        <br />
                        <CommentForm
                            comment={comment}
                            setComment={setComment}
                            handleSubmit={handleSubmit}
                            loading={loading}
                        />
                        <div style={{ marginBottom: 20 }}></div>
                        <List
                            itemLayout="horizontal"
                            dataSource={comments}
                            renderItem={(item) => (
                                <List.Item key={item._id} id={item._id}>
                                    <List.Item.Meta
                                        avatar={<Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>}
                                        title={item?.postedBy?.name}
                                        description={`${item.content} - ${dayjs(item.createdAt).fromNow()}`} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={2} xl={6} offset={1}>
                    <Divider style={{ fontFamily: "cursive", marginTop: 20 }}><h3>Categories</h3></Divider>
                    {categories.map(c => (
                        <Link href={`/category/${c.slug}`} key={c._id} legacyBehavior>
                            <a>
                                <Button style={{ margin: 4, fontFamily: "cursive" }}>{c.name}</Button>
                            </a>
                        </Link>
                    ))}
                    <Divider style={{ fontFamily: "cursive", marginTop: 40 }}><h3>Latest Posts</h3></Divider>
                    {latestPosts.map(p => (
                        <Link href={`/post/${p.slug}`} key={p._id} legacyBehavior>
                            <a style={{ margin: 4, fontFamily: "cursive" }}>
                                <h3 style={{ marginLeft: 20 }}>
                                    {p.title}
                                </h3>
                            </a>
                        </Link>
                    ))}
                </Col>
            </Row>
        </>
    )
};

export async function getServerSideProps({ params }) {
    const { data } = await axios.get(`${process.env.API}/post/${params.slug}`)
    return {
        props: {
            post: data.post,
            postComments: data.comments,
        }
    };

}

export default SinglePost;