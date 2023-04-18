import AuthorLayout from "../../../components/Layout/AuthorLayout";
import EditPostComponent from "../../../components/posts/EditPostComponent";

function EditPost() {
    return (
        <AuthorLayout>
            <EditPostComponent page="author"/>
        </AuthorLayout >
    );
}

export default EditPost;