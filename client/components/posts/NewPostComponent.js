import Editor from "rich-markdown-editor";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Col, Input, Select, Modal, Button, Image } from "antd";
import { useContext, useState, useEffect } from "react";
import {ThemeContext} from "../../context/theme"
import axios from "axios";
import {uploadImage} from "../../functions/upload"
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Media from "../media"
import { MediaContext } from "../../context/media";

const { Option } = Select

function NewPostComponent({page="admin"}) {
    const [theme, setTheme] = useContext(ThemeContext)
    const [loadings, setLoadings] = useState([]);
    const router = useRouter();

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 2000);
    };

    const savedTitle = () => {
        if (process.browser) {
            if (localStorage.getItem('post-title')) {
                return JSON.parse(localStorage.getItem('post-title'));
            }
        }
    }

    const savedContent = () => {
        if (process.browser) {
            if (localStorage.getItem('post-content')) {
                return JSON.parse(localStorage.getItem('post-content'));
            }
        }
    }

    const [content, setContent] = useState(savedContent());
    const [title, setTitle] = useState(savedTitle());
    const [categories, setCategories] = useState([]);
    const [loadedCategories, setLoadedCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    //const [visibleMedia, setVisibleMedia] = useState(false);
    const [media, setMedia] = useContext(MediaContext);

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setLoadedCategories(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handlePublish = async () => {
        try {
            const { data } = await axios.post('/create-post', {
                title,
                content,
                categories,
                featuredImage: media?.selected?._id
            })
            if (data?.error) {
                toast.error(data?.error);
            } else {
                console.log("Response: ", data)
                toast.success("Post created successfully")
                localStorage.removeItem("post-title")
                localStorage.removeItem("post-content")
                setMedia({...media, selected: null})
                router.push(`/${page}/posts`);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Post creation failed..Try Again")
        }
    }

    return (

            <Row>
                <Col span={14} offset={1}>
                    <h1
                        style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "center", marginTop: 20,
                            fontFamily: "cursive", fontSize: 20
                        }}>
                        Create New Post</h1>
                    <Input
                        style={{
                            fontFamily: "cursive", fontSize: 18,
                            marginBottom: 15
                        }}
                        value={title}
                        placeholder="Give a title"
                        size="large"
                        onChange={(e) => {
                            setTitle(e.target.value)
                            localStorage.setItem("post-title", JSON.stringify(e.target.value))
                        }} />
                    <div className="editor-scroll">
                        <Editor
                            dark={theme === "light" ? false : true}
                            defaultValue={content}
                            onChange={(v) => {
                                setContent(v());
                                localStorage.setItem("post-content", JSON.stringify(v()))
                            }}
                            uploadImage={uploadImage}
                        />
                    </div>
                </Col>
                <Col span={8} offset={1}>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            borderRadius: 10, marginTop: 20,
                            marginLeft: 100, fontFamily: "cursive", width: '30%'
                        }}
                        onClick={() => setVisible(true)}>Preview</Button>
                    <h3 style={{ marginLeft: 120, fontFamily: "cursive", marginTop: 30 }}>Categories</h3>
                    <Select mode="multiple" allowClear={true}
                        placeholder="Select Categories" style={{ width: '90%', fontFamily: "cursive" }} size="middle"
                        onChange={(v) => setCategories(v)}>
                        {loadedCategories.map((item) => <Option key={item.name}>{item.name}</Option>)}
                    </Select>
                    <Button
                        type="ghost"
                        size="large"
                        style={{
                            borderRadius: 10, marginTop: 20,
                            fontFamily: "cursive", width: "70%", marginLeft: 33
                        }}
                        onClick={() => { setMedia({...media, showMediaModal: true}) }}><UploadOutlined />Add Image</Button>
                    
                    {media?.selected && (
                        <Image width="80%" src={media?.selected?.url} style={{marginTop: 20, marginLeft: 12}}/>
                    )}
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            borderRadius: 20, marginTop: 25,
                            fontFamily: "cursive", width: "70%", marginLeft: 33
                        }}
                        loading={loadings[1]}
                        onClick={() => { handlePublish(); enterLoading(1) }}>Publish</Button>

                </Col>
                {/* preview Modal */}
                <Modal
                    title="Preview"
                    style={{fontFamily: "cursive"}}
                    centered
                    open={visible}
                    footer={null}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={720}>
                    <h1>{title}</h1>
                    <Editor
                        dark={theme === "light" ? false : true}
                        defaultValue={content}
                        readOnly={true}
                    />
                </Modal>
                {/* Media Modal */}
                <Modal
                    open={media.showMediaModal}
                    title="Media"
                    style={{fontFamily: "cursive"}}
                    onOk={() => setMedia({...media, showMediaModal: false})}
                    onCancel={() => setMedia({...media, showMediaModal: false})}
                    width={720}
                    footer={null}>
                    <Media />
                </Modal>
            </Row>
        
    );
}

export default NewPostComponent;