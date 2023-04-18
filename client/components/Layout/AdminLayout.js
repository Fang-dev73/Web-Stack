import { Layout } from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import AdminNav from "../nav/AdminNav";
import { AuthContext } from "../../context/auth";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";

const { Content } = Layout;

function AdminLayout({ children }) {

    const [auth, setAuth] = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        if (auth?.token) {
            getCurrentAdmin();
        }
    }, [auth?.token]);

    const getCurrentAdmin = async () => {
        try {
            const { data } = await axios.get("/current-admin")
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            router.push('/')
        }

    }

    if (loading) {
        return <LoadingOutlined
            style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                height: "100vh", fontSize: "50px", color: "red"
            }} />;
    }

    return (
        <Layout>
            <AdminNav />
            <Layout>
                <Content style={{ padding: 10 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;