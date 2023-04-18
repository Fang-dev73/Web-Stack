import { Modal, Form, Input, Button } from "antd";
import { EditFilled } from "@ant-design/icons";


const CategoryUpdateModal = ({ visible, setVisible, handleUpdate, updatingCategory }) => {
    return (
        <Modal title="Edit Category"
            open={visible} footer={null} onCancel={() => setVisible(false)}
            onOk={() => setVisible(false)}>
            <Form onFinish={handleUpdate} fields={[{name: ["name"], value: updatingCategory.name}]}>
                <Form.Item
                    name="name">
                    <Input prefix={<EditFilled className="site-form-item-icon" />} />
                </Form.Item>
                <Form.Item style={{ marginLeft: 25 }}>
                    <Button type="primary"
                        htmlType="submit"
                        size='large'
                        style=
                        {{ marginTop: 10, fontFamily: "cursive", marginLeft: 160 }}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CategoryUpdateModal;