import { LockOutlined, MailOutlined, CodepenOutlined} from '@ant-design/icons';
import { Button, Form, Input, Col, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from "next/router";
import React, { useState, useContext } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/auth';

function ForgotPassword() {
    const [loadings, setLoadings] = useState([]);
    const [auth, setAuth] = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const forgotPasswordReqest = async (values) => {
        console.log(values);
        try {
            const { data } = await axios.post("/forgot-password", values);
            if (data.err) {
                toast.error(data.err);
            }
            else {
                toast.success("Password reset link sent to your email");
                setVisible(true)
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    const resetPasswordReqest = async (values) => {
        console.log(values);
        try {
            const { data } = await axios.post("/reset-password", values);
            if (data.error) {
                toast.error(data.error);
            }
            else {
                toast.success("Password changed successfully.");
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to Reset your Password.");
        }
    }

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

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{ paddingTop: 80, marginLeft: 140, fontFamily: "cursive" }}>Forgot Password</h1>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={visible ? resetPasswordReqest : forgotPasswordReqest}
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

                    {visible && (
                        <>
                            {/* Reset Code */}
                            <Form.Item
                                name="resetCode"
                            >
                                <Input prefix={<CodepenOutlined className="site-form-item-icon" />} 
                                placeholder="Enter  Reset Code" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter your new Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Enter New Password"
                                />
                            </Form.Item>
                        </>
                    )}

                    {/* Submit */}
                    <Form.Item style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 35, paddingTop: 20 }}>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size='large'
                            style={{ borderRadius: 20, fontFamily: "cursive", marginBottom: 20 }}
                            loading={loadings[1]}
                            onClick={() => enterLoading(1)}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default ForgotPassword;