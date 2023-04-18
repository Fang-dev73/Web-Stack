import axios from "axios";
import { Row, Col, Card, Avatar, Button } from 'antd'
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const { Meta } = Card;

export const Posts = ({ posts }) => {
    const [allPosts, setAllPosts] = useState(posts);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTotal();
    }, [])

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])

    const getTotal = async () => {
        try {
            const { data } = await axios.get('/post-count')
            setTotal(data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/posts/${page}`);
            setAllPosts([...allPosts, ...data]);
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
                <title>Recent posts</title>
                <meta description="Posts about programming" />
            </Head>
            <Row>
                {allPosts.map((post) => (
                    <Col sm={24} lg={8}>
                        <Link href={`/post/${post.slug}`} legacyBehavior>
                            <a>
                                <Card
                                    style={{ margin: 12 }}
                                    hoverable
                                    cover={<Avatar shape="square" style={{ height: 200 }}
                                        src={post.featuredImage?.url || "images/default.jpg"}
                                        alt={post.title}
                                    />}
                                >
                                    <Meta title={post.title} />
                                </Card>
                            </a>
                        </Link>
                    </Col>
                ))}
            </Row>
            {allPosts.length < total && (
                <Row>
                    <Col span={24} style={{ textAlign: "center", padding: 2 }}>
                        <Button
                            size="large"
                            type="primary"
                            loading={loading}
                            onClick={() => setPage(page + 1)}>
                            Load More
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    )
};

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/posts/1`);
    return {
        props: {
            posts: data
        }
    };

}

export default Posts;