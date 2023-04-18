import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row } from 'antd';
import { useRouter } from "next/router";
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import toast from 'react-hot-toast';
import axios from "axios";


function Signup() {
    const [loadings, setLoadings] = useState([]);
    const [auth, setAuth] = useContext(AuthContext);
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
        }, 1000);
    };

    useEffect(() => {
        if (auth?.token) {
            router.push("/");
        }
    }, [auth]);

    const onFinish = async (values) => {
        // console.log('Received values: ', values);
        try {
            const { data } = await axios.post(`signup`, values);
            if (data?.error) {
                toast.error(data.error);
            }
            else {
                toast.success('Signed Up Successfully');
                setAuth(data)
                localStorage.setItem('auth', JSON.stringify(data));
                router.push('/signin');
            }
        }
        catch (err) {
            toast.error('Signup failed. Try Again Later :(');
            console.log(err)
        };
    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{ paddingTop: 80, marginLeft: 150, fontFamily: "cursive" }}>SignUp</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    {/* name */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter your Name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item>

                    {/* email */}
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Please enter a valid email address!!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    {/* password */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 130, paddingTop: 20 }}>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size='large'
                            style={{ borderRadius: 20, fontFamily: "cursive" }}
                            loading={loadings[1]}
                            onClick={() => enterLoading(1)}>
                            Regiter
                        </Button>
                        <br />
                        <br />
                        <h4 style={{ fontFamily: "cursive", fontSize: 16, marginRight: 120 }}>Already have an account?</h4>
                        <Link href="/signin" legacyBehavior
                            style={{ fontSize: 16, fontFamily: "cursive", marginLeft: 18 }}>Login</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Signup;