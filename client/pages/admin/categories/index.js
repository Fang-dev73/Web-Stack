import { Form, Input, Row, Col, Button, List } from "antd";
import AdminLayout from "../../../components/Layout/AdminLayout";
import { EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryUpdateModal from "../../../components/CategoryUpdateModal";
import { PostContext } from "../../../context/post";

function Categories() {
    const [loadings, setLoadings] = useState([]);
    const [form] = Form.useForm();
    const [post, setPost] = useContext(PostContext);
    const [updatingCategory, setUpdatingCategory] = useState({});
    const [visible, setVisible] = useState(false)

    const {categories} = post;

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
        console.log(values);
        try {
            const { data } = await axios.post(`/category`, values)
            console.log(data);
            //setCategories([data, ...categories]);
            setPost((prev) => ({...prev, categories: [data, ...categories]}))
            toast.success("Category created Successfully")
            form.resetFields(['name']);
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to create Category")
        }
    }

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`/categories`)
            setPost((prev) => ({...prev, categories: data}));
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to get Categories")
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    const handleEdit = async (item) => {
        setUpdatingCategory(item);
        setVisible(true);
    }

    const handleUpdate = async (values) => {
        try {
            const { data } = await axios.put(`/category/${updatingCategory.slug}`, values)
            console.log("Category updated", data);

            const newCategories = categories.map((c) => {
                if(c._id === data._id)
                {
                    return data;
                }
                return c;
            })
            //setCategories(newCategories);
            setPost(prev => ({...prev, categories: newCategories}))
            toast.success("Category updated Successfully")
            setVisible(false);
            setUpdatingCategory({});
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to update Category")
        }
    }

    const handleDelete = async (item) => {
        try {
            const { data } = await axios.delete(`/category/${item.slug}`)
            console.log(data)
            //setCategories(categories.filter((c) => c._id !== data._id));
            setPost(prev => ({...prev, categories: categories.filter((c) => c._id !== data._id)}));
            toast.success("Category deleted Successfully")
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to delete Category")
        }
    }

    return (
        <AdminLayout>
            <Row>
                {/* Enter Category */}
                <Col xs={22} sm={22} lg={8} offset={2}>
                    <h1 style={{
                        paddingTop: 80, marginLeft: 120, fontFamily: "cursive", fontSize: 25
                    }
                    }>Category</h1>
                    <Form onFinish={onFinish} form={form}>
                        <Form.Item
                            name="name"
                            style={{ marginTop: 50 }}>
                            <Input prefix={<EditOutlined className="site-form-item-icon" />}
                                placeholder="Input a Category" />
                        </Form.Item>
                        {/* Submit */}
                        <Form.Item style={{ marginLeft: 25, paddingTop: 30 }}>
                            <Button type="primary"
                                htmlType="submit"
                                size='large'
                                style={{ borderRadius: 20, fontFamily: "cursive", marginBottom: 20, marginLeft: 100 }}
                                loading={loadings[1]}
                                onClick={() => enterLoading(1)}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                {/* Category List */}
                <Col xs={22} lg={12} sm={22} offset={1}>
                    <List
                        itemLayout="horizontal"
                        dataSource={categories}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <a onClick={() => handleEdit(item)}>edit</a>,
                                    <a onClick={() => handleDelete(item)}>delete</a>]}
                            >
                                <List.Item.Meta style={{ marginLeft: 15 }} title={item.name} />
                            </List.Item>
                        )}
                    />
                </Col>
                <CategoryUpdateModal
                    visible={visible}
                    setVisible={setVisible}
                    handleUpdate={handleUpdate}
                    updatingCategory={updatingCategory} />
            </Row >
        </AdminLayout >

    );
}

export default Categories;