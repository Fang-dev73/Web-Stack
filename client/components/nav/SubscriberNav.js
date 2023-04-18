import {
    DashboardTwoTone,
    ProfileOutlined,
    CommentOutlined
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useWindowWidth } from '@react-hook/window-size';
import { AuthContext } from '../../context/auth';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SubscriberNav = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('')
    const [auth, setAuth] = useContext(AuthContext);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onlyWidth = useWindowWidth();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    useEffect(() => {
        onlyWidth < 700 ? setCollapsed(true) : setCollapsed(false);
    }, [onlyWidth < 700])

    const activeName = (name) => `${current === name && "active"}`;

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}>
            <Menu
                defaultOpenKeys={["sub1", "sub3"]}
                mode="inline"
                inlineCollapsed={collapsed}
            >
                {/* Dashboard */}
                <Menu.Item key="1" icon={<DashboardTwoTone />}>
                    <Link href="/subscriber" legacyBehavior>
                        <a className={activeName('/subscriber')} style={{ fontFamily: "cursive" }}>Dashboard</a>
                    </Link>
                </Menu.Item>

                {/* Profile */}
                <Menu.Item key="9" icon={<ProfileOutlined />}>
                    <Link href={`/subscriber/${auth?.user?._id}`} legacyBehavior>
                        <a className={activeName(`/subscriber/${auth?.user?._id}`)} style={{ fontFamily: "cursive" }}>Profile</a>
                    </Link>
                </Menu.Item>

                {/* comments */}
                <Menu.Item key="11" icon={<CommentOutlined />}>
                    <Link href="/subscriber/comments" legacyBehavior>
                        <a className={activeName('/subscriber/comments')} style={{ fontFamily: "cursive" }}>Comments</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SubscriberNav;