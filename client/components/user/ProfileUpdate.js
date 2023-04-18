import { useState, useEffect, useContext } from "react"
import { Row, Col, Button, Input, Select, Avatar } from "antd"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useRouter } from "next/router"
import { AuthContext } from "../../context/auth";
import { MediaContext } from "../../context/media";
import Media from '../media';

const ProfileUpdate = ({ page = "admin" }) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [role, setRole] = useState('');
    const [auth, setAuth] = useContext(AuthContext);
    const [media, setMedia] = useContext(MediaContext);
    const [image, setImage] = useState({});

    const router = useRouter();
    //console.log(router.query.id);

    useEffect(() => {
        const currentUser = async () => {
            try {
                const { data } = await axios.get(`/user/${router?.query?.id}`);
                //console.log("Current user: ", data);
                setId(data._id);
                setName(data.name);
                setEmail(data.email);
                setWebsite(data.website);
                setRole(data.role);
                setImage(data.image);
            }
            catch (err) {
                console.log(err);
            }
        }
        if (auth?.token) currentUser();
    }, [auth, router?.query?.id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/update-user-by-${page}`, {
                id,
                name,
                email,
                password,
                website,
                role,
                image:
                    media?.selected?._id
                        ? media?.selected?._id
                        : image?._id
                            ? image
                            : undefined
            })
            console.log("Update User: ", data);
            if (data?.error) {
                toast.error(data.error);
            }
            else {

                if (auth?.user?._id === data._id) {

                    setAuth({ ...auth, user: data });
                    let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
                    fromLocalStorage.user = data;
                    localStorage.setItem("auth", JSON.stringify(fromLocalStorage));
                }
                toast.success("User updated successfully");
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to Update User")
        }
    }

    return (
        <Row>
            <Col span={12} offset={5}>
                <h2
                    style={{ marginTop: 5, marginLeft: 225, fontFamily: "cursive" }}>
                    Profile Update
                </h2>
                <div style={{ marginBottom: 5, textAlign: "center" }}>
                    {media.selected ? (
                        <>
                            <Avatar src={media.selected.url} size={100} />
                        </>
                    ) : image ? (
                        <>
                            <Avatar src={image.url} size={100} />
                        </>
                    ) : (
                        " "
                    )}
                </div>
                {auth?.user?.role !== "Subscriber" && <Media />}
                <Input
                    style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive" }}
                    size="large"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <Input
                    style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive" }}
                    size="large"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <Input
                    style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive" }}
                    size="large"
                    placeholder="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)} />
                <Input.Password
                    style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive" }}
                    size="large"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {page === "admin" && (
                    <Select
                        value={role}
                        size="large"
                        style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive", width: "100%" }}
                        onChange={(e) => setRole(e)}
                    >
                        <Select.Option value="Subscriber">Subscriber</Select.Option>
                        <Select.Option value="Author">Author</Select.Option>
                        <Select.Option value="Admin">Admin</Select.Option>
                    </Select>
                )}
                <br />
                <Button
                    onClick={handleSubmit}
                    type="primary"
                    size="large"
                    style={{ marginTop: 30, marginLeft: 18, fontFamily: "cursive", borderRadius: 20, fontSize: 18 }}
                    block>
                    Update
                </Button>
            </Col>
        </Row>
    )
}

export default ProfileUpdate;