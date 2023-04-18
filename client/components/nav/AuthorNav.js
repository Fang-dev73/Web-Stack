import {
    DashboardTwoTone,
    PlusCircleOutlined,
    AppstoreTwoTone,
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

const AuthorNav = () => {
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
                    <Link href="/author" legacyBehavior>
                        <a className={activeName('/author')} style={{ fontFamily: "cursive" }}>Dashboard</a>
                    </Link>
                </Menu.Item>

                {/* Posts */}
                <SubMenu key="sub1"
                    icon={<PlusCircleOutlined />}
                    style={{ fontFamily: "cursive" }}
                    title="Posts">
                    <Menu.Item key="2">
                        <Link href="/author/posts" legacyBehavior>
                            <a className={activeName('/author/posts')} style={{ fontFamily: "cursive" }}>All Posts</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link href="/author/posts/new" legacyBehavior>
                            <a className={activeName('/author/posts/new')} style={{ fontFamily: "cursive" }}>Add New</a>
                        </Link>
                    </Menu.Item>
                </SubMenu>

                {/* Media */}
                <SubMenu key="sub2" icon={<AppstoreTwoTone />} title="Media" style={{ fontFamily: "cursive" }}>
                    <Menu.Item key="5">
                        <Link href="/author/media/library" legacyBehavior>
                            <a className={activeName('/author/media/library')} style={{ fontFamily: "cursive" }}>Library</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link href="/author/media/new" legacyBehavior>
                            <a className={activeName('/author/media/new')} style={{ fontFamily: "cursive" }}>Add New</a>
                        </Link>
                    </Menu.Item>
                </SubMenu>

                {/* Profile */}
                <Menu.Item key="9" icon={<ProfileOutlined />}>
                    <Link href={`/author/${auth?.user?._id}`} legacyBehavior>
                        <a className={activeName(`/author/${auth?.user?._id}`)} style={{ fontFamily: "cursive" }}>Profile</a>
                    </Link>
                </Menu.Item>

                {/* comments */}
                <Menu.Item key="11" icon={<CommentOutlined />}>
                    <Link href="/author/comments" legacyBehavior>
                        <a className={activeName('/author/comments')} style={{ fontFamily: "cursive" }}>Comments</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default AuthorNav;