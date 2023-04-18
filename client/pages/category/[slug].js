import axios from "axios";
import { Card, Row, Col, Button, Divider, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import {useCategory}  from "../../hooks/useCategory";
import {useLatestPosts} from "../../hooks/useLatestPosts";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const SingleCategory = ({ posts, category }) => {

    
    const {categories} = useCategory();
    const {latestPosts} = useLatestPosts();

    return (
        <>
            <Head>
                <title>{category.name}</title>
                <meta
                    name="descritpion"
                    content={`Read latest posts on ${category.name}`} />
            </Head>

            <div style={{ marginTop: 20 }}></div>

            <Row>
                <Col sm={24} lg={17}>
                    <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>Posts in {category.name}</h1>
                    {/* post list */}
                    {posts.map((post) => (
                        <Card key={post._id}>
                            <div style={{ display: 'flex' }}>
                                <Avatar
                                    shape="square"
                                    size={60}
                                    style={{ marginRight: 15 }}
                                    src={post.featuredImage?.url || "/images/default.jpg"}
                                    alt={post.title}
                                />
                                <div>
                                    <Link href={`/post/${post.slug}`} legacyBehavior>
                                        <a>
                                            <h2 style={{ fontFamily: "cursive" }}>{post.title}</h2>
                                        </a>
                                    </Link>
                                    <p
                                        style={{ fontFamily: "cursive" }}>
                                        {dayjs(post.createdAt)
                                        .format("MMMM D, YYYY h:m A")} by {post?.postedBy?.name}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </Col>

                <Col xs={24} xl={6} offset={1}>
                    <Divider style={{fontFamily: "cursive", marginTop: 20}}><h3>Categories</h3></Divider>
                    {categories.map(c => (
                        <Link href={`/category/${c.slug}`} key={c._id} legacyBehavior>
                            <a>
                                <Button style={{margin: 4, fontFamily: "cursive"}}>{c.name}</Button>
                            </a>
                        </Link>
                    ))}
                    <Divider style={{fontFamily: "cursive", marginTop: 40}}><h3>Latest Posts</h3></Divider>
                    {latestPosts.map(p => (
                        <Link href={`/post/${p.slug}`} key={p._id} legacyBehavior>
                            <a style={{margin: 4, fontFamily: "cursive"}}>
                                <h3 style={{marginLeft: 20}}>
                                {p.title}
                                </h3>
                            </a>
                        </Link>
                    ))}
                </Col>
            </Row>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const { data } = await axios.get(`${process.env.API}/posts-by-category/${params.slug}`)
    return {
        props: {
            posts: data.posts,
            category: data.category
        }
    }
}

export default SingleCategory;


