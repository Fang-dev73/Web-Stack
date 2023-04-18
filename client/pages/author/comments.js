import AuthorLayout from "../../components/Layout/AuthorLayout";
import UserComments from "../../components/comments/UserComments";

function Comments() {
    return (
        <AuthorLayout>
            <UserComments />
        </AuthorLayout>
    );
}

export default Comments;