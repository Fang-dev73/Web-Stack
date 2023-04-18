import { useContext, useState, useEffect } from "react";
import { Row, Col, Input, Button, Image, Divider } from "antd";
import Media from "../../components/media"
import { MediaContext } from "../../context/media";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/Layout/AdminLayout";

const Customize = () => {

    const [media, setMedia] = useContext(MediaContext);
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [fullWidthImage, setFullWidthImage] = useState("");

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

    const handleSave = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/page', {
                page: "home",
                title,
                subtitle,
                fullWidthImage: media?.selected?._id
            })
            setLoading(false);
            toast.success("Page Updated Successfully")
        }
        catch (err) {
            console.log(err);
            setLoading(false);
            toast.error("Error updating")
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <Divider>
                        <h1 style={{ fontFamily: "cursive", fontSize: 30 }}>Customize Home Page</h1>
                    </Divider>
                </Col>

                <Col span={16} style={{ marginLeft: 20 }}>
                    <Media />
                    <Input
                        style={{ marginTop: 20 }}
                        size="large"
                        placeholder="Update your title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        style={{ marginTop: 20 }}
                        size="large"
                        placeholder="Update your subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />

                    <Button
                        onClick={handleSave}
                        size="large"
                        type="primary"
                        style={{
                            marginTop: 20,
                            width: "30%",
                            marginLeft: 300,
                            borderRadius: 18,
                            fontFamily: "cursive"
                        }}
                        loading={loading}>
                        Save
                    </Button>
                </Col>
                <Col span={7}>
                    <div style={{ margin: 40 }}>
                        {media?.selected ? (
                            <Image width="100%" src={media?.selected?.url} />
                        ) : fullWidthImage ? (
                            <Image width="100%" src={fullWidthImage.url} />
                        ) : ''}
                    </div>
                </Col>
            </Row>
        </AdminLayout>
    )
}

export default Customize;