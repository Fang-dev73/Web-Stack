import {
    DashboardTwoTone,
    PlusCircleOutlined,
    AppstoreTwoTone,
    UsergroupAddOutlined,
    SettingTwoTone,
    CommentOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/auth';
import Link from 'next/link';
import {useWindowWidth} from '@react-hook/window-size';

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminNav = () => {
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
                    <Link href="/admin" legacyBehavior>
                        <a className={activeName('/admin')} style={{fontFamily:"cursive"}}>Dashboard</a>
                    </Link>
                </Menu.Item>
                
                 {/* Posts */}
                <SubMenu key="sub1" 
                icon={<PlusCircleOutlined />}
                style={{fontFamily:"cursive"}} 
                title="Posts">
                    <Menu.Item key="2">
                        <Link href="/admin/posts" legacyBehavior>
                            <a className={activeName('/admin/posts')} style={{fontFamily:"cursive"}}>All Posts</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link href="/admin/posts/new" legacyBehavior>
                            <a className={activeName('/admin/posts/new')} style={{fontFamily:"cursive"}}>Add New</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link href="/admin/categories" legacyBehavior>
                            <a className={activeName("/admin/categories")} style={{fontFamily:"cursive"}}>Add Category</a>
                        </Link>
                    </Menu.Item>
                </SubMenu>

                {/* Media */}
                <SubMenu key="sub2" icon={<AppstoreTwoTone />} title="Media" style={{fontFamily:"cursive"}}>
                    <Menu.Item key="5">
                        <Link href="/admin/media/library" legacyBehavior>
                            <a className={activeName('/admin/media/library')} style={{fontFamily:"cursive"}}>Library</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link href="/admin/media/new" legacyBehavior>
                            <a className={activeName('/admin/media/new')} style={{fontFamily:"cursive"}}>Add New</a>
                        </Link>
                    </Menu.Item>
                </SubMenu>

            {/* Users */}
            <SubMenu key="sub3" icon={<UsergroupAddOutlined />} title="Users" style={{fontFamily:"cursive"}}>
                <Menu.Item key="7">
                    <Link href="/admin/users" legacyBehavior>
                        <a className={activeName('/admin/users')} style={{fontFamily:"cursive"}}>All Users</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link href="/admin/users/new" legacyBehavior>
                        <a className={activeName('/admin/users/new')} style={{fontFamily:"cursive"}}>Add New</a>
                    </Link>
                </Menu.Item>
            </SubMenu>

            {/* Profile */}
                <Menu.Item key="9" icon={<ProfileOutlined/>}>
                    <Link href={`/admin/${auth?.user?._id}`} legacyBehavior>
                        <a className={activeName(`/admin/${auth?.user?._id}`)} style={{fontFamily:"cursive"}}>Profile</a>
                    </Link>
                </Menu.Item>

            {/* Customize */}
            <Menu.Item key="10" icon={<SettingTwoTone />}>
                    <Link href="/admin/customize" legacyBehavior>
                        <a className={activeName('/admin/customize')} style={{fontFamily:"cursive"}}>Customize</a>
                    </Link>
                </Menu.Item>

             {/* comments  */}
            <Menu.Item key="11" icon={<CommentOutlined />}>
                <Link href="/admin/comments" legacyBehavior>
                    <a className={activeName('/admin/comments')} style={{fontFamily:"cursive"}}>Comments</a>
                </Link>
            </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default AdminNav;