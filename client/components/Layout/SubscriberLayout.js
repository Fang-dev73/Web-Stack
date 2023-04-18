import { Layout } from "antd";
import SubscriberNav from "../nav/SubscriberNav";
import { AuthContext } from "../../context/auth";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import { LoadingToRedirect } from "../LoadingToRedirect";

const { Content } = Layout;

function SubscriberLayout({ children }) {

    const [auth, setAuth] = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        if (auth?.token) {
            getCurrentSubscriber();
        }
    }, [auth?.token]);

    const getCurrentSubscriber = async () => {
        try {
            const { data } = await axios.get("/current-subscriber")
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            router.push('/')
        }

    }

    if (loading) {
        return <LoadingToRedirect />;
    }

    return (
        <Layout>
            <SubscriberNav />
            <Layout>
                <Content style={{ padding: 10 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default SubscriberLayout;