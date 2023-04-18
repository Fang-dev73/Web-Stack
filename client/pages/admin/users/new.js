import { useState } from "react"
import AdminLayout from '../../../components/Layout/AdminLayout'
import { Row, Col, Button, Input, Checkbox, Select } from "antd"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useRouter } from "next/router"
import generator from "generate-password"

const NewUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(generator.generate({ length: 10 }));
    const [website, setWebsite] = useState('');
    const [role, setRole] = useState('');
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/create-user',
                { name, email, website, password, role, checked }
            )
            if (data.error) {
                toast.error(data.error);
            }
            else {
                toast.success("User created Successfully")
            }
            //console.table({name , email, website, password, role, checked})
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to signup")
        }
    }

    return (
        <AdminLayout>
            <Row>
                <Col span={12} offset={5}>
                    <h2
                        style={{ marginTop: 15, marginLeft: 225, fontFamily: "cursive" }}>
                        Add new User
                    </h2>
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
                    <div style={{ display: "flex" }}>
                        <Button
                            onClick={() => setPassword(generator.generate({ length: 10 }))}
                            type="default"
                            size="large"
                            style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive" }}
                        >
                            Generate Password
                        </Button>
                        <Input.Password
                            style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive" }}
                            size="large"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Select
                        defaultValue="Subscriber"
                        size="large"
                        style={{ marginTop: 20, marginLeft: 20, fontFamily: "cursive", width: "100%" }}
                        onChange={(e) => setRole(e)}
                    >
                        <Select.Option value="Subscriber">Subscriber</Select.Option>
                        <Select.Option value="Author">Author</Select.Option>
                        <Select.Option value="Admin">Admin</Select.Option>
                    </Select>
                    <Checkbox
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        style={{ marginTop: 10, marginLeft: 25, fontFamily: "cursive", fontSize: 16 }}>
                        Send the new user an email about their account.
                    </Checkbox>
                    <br />
                    <Button
                        onClick={handleSubmit}
                        type="primary"
                        size="large"
                        style={{ marginTop: 30, marginLeft: 18, fontFamily: "cursive", borderRadius: 20, fontSize: 18 }}
                        block>
                        Submit
                    </Button>
                </Col>
            </Row>
        </AdminLayout>
    )
}

export default NewUser;