import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row } from 'antd';
import Link from 'next/link';
import {useRouter} from "next/router";
import React, { useState, useContext, useEffect} from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/auth';
import user from '../../server/models/user';

function Signin() {
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
        }, 2000);
    };

    useEffect(() => {
        if(auth?.token){
            router.push("/");
        }
    }, [auth]);

    const onFinish = async (values) => {
        //console.log('Received values of form: ', values);
        try{
            const {data} = await axios.post(`/signin`, values);
            if(data?.error) {
                toast.error(data.error);
            }
            else{
                toast.success('Signed In Successfully');
                setAuth(data)
                localStorage.setItem('auth',JSON.stringify(data));
                if(data?.user?.role === 'Admin')
                {
                    router.push('/admin');
                }
                else if(data?.user?.role === 'Author')
                {
                    router.push('/author');
                }
                else
                {
                    router.push('/subscriber');
                }
            }
        } 
        catch(err){
            toast.error("SignIn Failed Try again Later :(")
            console.log(err);
        }
    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{ paddingTop: 80, marginLeft: 140, fontFamily: "cursive" }}>SignIn</h1>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
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

                    {/* Login */}
                    <Form.Item style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 35, paddingTop: 20 }}>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size='large'
                            style={{ borderRadius: 20, fontFamily: "cursive", marginBottom: 20, marginLeft: 100 }}
                            loading={loadings[1]}
                            onClick={() => enterLoading(1)}>
                            Login
                        </Button>
                        <Link href="/forgot-password" legacyBehavior>
                            <a style={{ fontFamily: "cursive", marginLeft: 125 }}>Forgot Password</a>
                        </Link>
                        <h4 style={{ fontFamily: "cursive", fontSize: 16, marginLeft: 85, marginTop: 1 }}>Don't have an account?</h4>
                        <Link href="/signup"
                            style={{ fontSize: 16, fontFamily: "cursive", marginLeft: 130 }}>Register</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Signin;