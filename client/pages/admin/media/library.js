import AdminLayout from "../../../components/Layout/AdminLayout";
import {Row, Col} from "antd"
import MediaLibrary from "../../../components/media/MediaLibrary";

function AdminMediaLibrary() {
    return(
    <AdminLayout>
        <Row>
            <Col span={24}>
                <div style={{padding: 50, textAlign: "center"}}>
                    <MediaLibrary/>
                </div>
            </Col>
        </Row>
    </AdminLayout>
    );
}

export default AdminMediaLibrary;