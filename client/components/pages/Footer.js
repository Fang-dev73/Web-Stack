import ParallexImage from "./ParallexImage";
import { Row, Col } from "antd"
import { UsergroupAddOutlined, ApiOutlined, CopyrightOutlined } from "@ant-design/icons";


const Footer = () => {
    return (
        <div>
            <ParallexImage url="/images/footer.webp">
                <Row style={{fontFamily: "cursive"}}>
                    <Col span={8} style={{ textAlign: "center" }}>
                        <UsergroupAddOutlined style={{ fontSize: 70 }} />
                        <br />
                        <br/>
                       <h3>Modern CMS Website</h3> 
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                        <ApiOutlined style={{ fontSize: 70 }} />
                        <br />
                        <br/>
                        <h3>Built using MERN Stack</h3> 
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                        <CopyrightOutlined style={{ fontSize: 70 }} />
                        <br />
                        <br/>
                        <h3>Copyright {new Date().getFullYear()}  &copy: All Rights Reserved</h3>
                    </Col>
                </Row>
                <br />
            </ParallexImage>
        </div>
    )
}

export default Footer;