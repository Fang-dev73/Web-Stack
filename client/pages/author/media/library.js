import AuthorLayout from "../../../components/Layout/AuthorLayout";
import {Row, Col} from "antd"
import MediaLibrary from "../../../components/media/MediaLibrary";

function AdminMediaLibrary() {
    return(
    <AuthorLayout>
        <Row>
            <Col span={24}>
                <div style={{padding: 50, textAlign: "center"}}>
                    <MediaLibrary page="author"/>
                </div>
            </Col>
        </Row>
    </AuthorLayout>
    );
}

export default AdminMediaLibrary;