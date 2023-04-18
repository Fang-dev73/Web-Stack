import AdminLayout from "../../../components/Layout/AdminLayout";
import {Row, Col} from "antd"
import UploadFile from "../../../components/media/UploadFile";

function NewMedia() {
    return(
    <AdminLayout>
        <Row>
            <Col span={24}>
                <div style={{padding: 150, textAlign: "center"}}>
                    <UploadFile redirectToLibrary={true}/>
                </div>
            </Col>
        </Row>
    </AdminLayout>
    );
}

export default NewMedia;