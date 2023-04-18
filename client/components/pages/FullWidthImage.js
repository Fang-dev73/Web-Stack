import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Link from "next/link";

const FullWidthImage = ({title="Web-Stack", subtitle="CRUD Made Easy", fullWidthImage}) => (
    <>
        <img
            src={fullWidthImage}
            width="100%"
            height={500}
            style={{ overflow: "hidden", objectFit: "cover" }}
        />

        <div style={{textAlign: "center", marginTop: -420, fontStyle: "italic", fontFamily: "cursive", textShadow: "2px 2px 4px #00000"}}>
            <h1 style={{fontSize: 125, marginBottom: 1}}>{title}</h1>
            <p style={{fontSize: 30, marginBottom: 80}}>{subtitle}</p>
            <Link href={'/subscriber'} legacyBehavior>
                <a>
                    <Button 
                    type="primary"
                    size="large"
                    style={{fontFamily: "cursive", borderRadius: 16}}
                    icon={<SendOutlined/>}>Explore</Button>
                </a>
            </Link>

        </div>
    </>
)

export default FullWidthImage;