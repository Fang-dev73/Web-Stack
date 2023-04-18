import AuthorLayout from "../../../components/Layout/AuthorLayout";
import {Row, Col} from "antd"
import UploadFile from "../../../components/media/UploadFile";

function NewMedia() {
    return(
    <AuthorLayout>
        <Row>
            <Col span={24}>
                <div style={{padding: 150, textAlign: "center"}}>
                    <UploadFile redirectToLibrary={true} page="author"/>
                </div>
            </Col>
        </Row>
    </AuthorLayout>
    );
}

export default NewMedia;