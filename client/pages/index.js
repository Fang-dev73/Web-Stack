import { AuthContext } from "../context/auth";
import { useContext, useEffect, useState } from "react";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Button } from "antd";
import Head from "next/head";
import FullWidthImage from "../components/pages/FullWidthImage"
import { useNumbers } from "../hooks/useNumbers";
import RenderProgress from "../components/posts/RenderProgress";
import {useLatestPosts} from "../hooks/useLatestPosts";
import {useCategory} from "../hooks/useCategory";
import Link from "next/link";
import ParallexImage from "../components/pages/ParallexImage";
import Footer from "../components/pages/Footer";
import axios from "axios";


function Home() {

    const [auth, setAuth] = useContext(AuthContext);  
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [fullWidthImage, setFullWidthImage] = useState("");

    const { numbers } = useNumbers();
    const { latestPosts } = useLatestPosts();
    const { categories } = useCategory();

    useEffect(() => {
        loadHomepage();
    }, [])

    const loadHomepage = async () => {
        try {
            const { data } = await axios.get('/page/home');
            setTitle(data.title);
            setSubtitle(data.subtitle);
            setFullWidthImage(data.fullWidthImage);
            
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Head>
                <title>Modern Content Management System</title>
                <meta
                    name="description"
                    content="Read Latest Posts on your Favouirte Topics">
                </meta>
            </Head>
            <FullWidthImage 
                title={title} 
                subtitle={subtitle} 
                fullWidthImage={fullWidthImage.url}
            />
            <Row style={{ marginTop: 5 }}>
                {/* posts */}
                <Col span={6} style={{ marginTop: 70, textAlign: "center", fontSize: 20, fontFamily: "cursive" }}>
                    <RenderProgress
                        number={numbers.posts}
                        name="Posts"
                        link="/admin/posts"
                    />
                </Col>
                {/* comments */}
                <Col span={6} style={{ marginTop: 70, textAlign: "center", fontSize: 20, fontFamily: "cursive" }}>
                    <RenderProgress
                        number={numbers.comments}
                        name="Comments"
                        link="/admin/comments"
                    />
                </Col>
                {/* categories */}
                <Col span={6} style={{ marginTop: 70, textAlign: "center", fontSize: 20, fontFamily: "cursive" }}>
                    <RenderProgress
                        number={numbers.categories}
                        name="Categories"
                        link="/admin/categories"
                    />
                </Col>
                {/* users */}
                <Col span={6} style={{ marginTop: 70, textAlign: "center", fontSize: 20, fontFamily: "cursive" }}>
                    <RenderProgress
                        number={numbers.users}
                        name="Users"
                        link="/admin/users"
                    />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <ParallexImage>
                        <h2 style={{
                            textAlign: "center",
                            fontSize: 50,
                            fontFamily: "cursive",
                            textShadow: "2px 2px 4px #00000",
                            marginTop: 50
                        }}>Recent Posts</h2>
                        <Divider>
                            <ThunderboltOutlined />
                        </Divider>
                        <div style={{ textAlign: "center", fontSize: 20 }}>
                            {latestPosts.map((post) => (
                                <Link href={`/post/${post.slug}`} legacyBehavior>
                                    <a><h3>{post.title}</h3></a>
                                </Link>
                            ))}
                        </div>
                    </ParallexImage>
                </Col>
            </Row>

            <Row>
                <Col span={24} style={{ marginTop: 80, textAlign: "center", marginBottom: 80 }}>
                    <h2 style={{
                        textAlign: "center",
                        fontSize: 50,
                        fontFamily: "cursive",
                        textShadow: "2px 2px 4px #00000",
                        marginTop: 30
                    }}>Categories</h2>
                    <Divider>
                        <ThunderboltOutlined />
                    </Divider>
                    <div style={{ textAlign: "center", fontSize: 20 }}>
                        {categories.map((c) => (
                            <Link href={`/category/${c.slug}`} legacyBehavior key={c._id}>
                                <a>
                                    <Button style={{ margin: 10, fontSize: 18 }}>
                                        {c.name}
                                    </Button>
                                </a>
                            </Link>
                        ))}
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
}

export default Home;