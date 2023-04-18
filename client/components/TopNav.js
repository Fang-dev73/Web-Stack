import { Menu } from 'antd';
import {
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    HddOutlined,
    FilePptOutlined,
    DashboardTwoTone,
    UserOutlined,
    ContactsOutlined
} from '@ant-design/icons';
import ToggleTheme from './ToggleTheme';
import Link from "next/link";
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';

const TopNav = () => {
    const [current, setCurrent] = useState("mail");
    const [auth, setAuth] = useContext(AuthContext);
    const router = useRouter();

    const handleClick = (e) => {
        console.log("click", e);
        setCurrent(e.key)
    };

    const signOut = () => {
        localStorage.removeItem("auth");
        setAuth({
            user: null,
            token: ""
        })
        router.push("/signin");
    }

    const roleBasedLink = () => {
        if (auth.user.role === "Admin") {
            return "/admin";
        } else if (auth.user.role === "Author") {
            return "/author";
        } else {
            return "/subscriber";
        }
    }

    return (
        <Menu
            mode="horizontal"
            onClick={handleClick}
            selectedKeys={[current]}
        >
            <Menu.Item key="mail" icon={<HddOutlined />}>
                <Link href="/" legacyBehavior>
                    <a style={{fontFamily:"cursive"}}>Web-Stack</a>
                </Link>
            </Menu.Item>

            <Menu.Item key="posts" icon={<FilePptOutlined />}>
                <Link href="/posts" legacyBehavior>
                    <a style={{fontFamily:"cursive"}}>Posts</a>
                </Link>
            </Menu.Item>

            <Menu.Item key="contact" icon={<ContactsOutlined />}>
                <Link href="/contact" legacyBehavior>
                    <a style={{fontFamily:"cursive"}}>Contact</a>
                </Link>
            </Menu.Item>

            {auth?.user === null && (<>
                <Menu.Item style={{ marginLeft: "auto", fontFamily:"cursive"}} key="signup" icon={<UserAddOutlined />}>
                    <Link href="/signup" legacyBehavior>
                        <a style={{ color: "#722ed1" }}>SignUp</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="signin" icon={<LoginOutlined />}>
                    <Link href="/signin" legacyBehavior>
                        <a style={{ color: "#722ed1", fontFamily:"cursive" }}>SignIn</a>
                    </Link>
                </Menu.Item>
            </>)}

            {auth?.user !== null && (<>
                <Menu.SubMenu 
                style={{ marginLeft: "auto", fontFamily:"cursive", color: "Highlight" }}
                    key="SubMenu" title={auth?.user?.name || "Dashboard"} icon={<UserOutlined />}>
                    <Menu.ItemGroup title="Management">
                        <Menu.Item key="three" icon={<DashboardTwoTone />}>
                            <Link href={roleBasedLink()} legacyBehavior>
                                <a style={{ color: "#cb2b83", fontFamily:"cursive" }}>Dashboard</a>
                            </Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu.SubMenu>
                <Menu.Item
                    onClick={() => signOut()}
                    key="signout" icon={<LogoutOutlined />}>
                        <a style={{fontFamily:"cursive"}}>SignOut</a>
                </Menu.Item>
            </>)}
            <Menu.Item>
                <ToggleTheme />
            </Menu.Item>
        </Menu >
    );
}
export default TopNav;