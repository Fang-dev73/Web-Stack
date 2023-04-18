import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';

function ContactForm() {
    const [loadings, setLoadings] = useState([]);
    const [form] = Form.useForm();
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

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const { data } = await axios.post("/contact", values);
            if (data.error) {
                toast.error("Please enter relevant data", data.error);
            }
            else {
                toast.success("Message sent Successfully")
                form.resetFields();
            }
        }
        catch (err) {
            toast.error("Failed to send  your Message. Try again Later :(")
            console.log(err);
        }
    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <h1 style={{ paddingTop: 80, marginBottom: 30, marginLeft: 180, fontFamily: "cursive" }}>Contact</h1>

                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    {/* name */}
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Your name" />
                    </Form.Item>

                    {/* email */}
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Your email"
                        />
                    </Form.Item>


                    {/* message */}
                    <Form.Item
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: 'Please write some message',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Write your message here"
                        />
                    </Form.Item>


                    {/* Submit */}
                    <Form.Item style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 35, paddingTop: 20 }}>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size='large'
                            style={{ borderRadius: 20, fontFamily: "cursive", marginBottom: 20, marginRight: 60 }}
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

export default ContactForm;