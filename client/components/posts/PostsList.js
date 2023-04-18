import { List } from "antd";
import Link from "next/link";

const PostsList = ({ posts, handleEdit , handleDelete }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={posts}
            renderItem={(item) => (
                <List.Item
                    style={{ marginRight: 15, fontFamily: "cursive" }}
                    actions={[
                        <a onClick={() => handleEdit(item)}>edit</a>,
                        <a onClick={() => handleDelete(item)}>delete</a>
                    ]}>
                    <List.Item.Meta title={item.title} />
                </List.Item>
            )}
        />
    )
}

export default PostsList;