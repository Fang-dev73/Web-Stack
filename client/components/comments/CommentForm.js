import { useContext } from "react"
import { AuthContext } from "../../context/auth"
import { Input, Button } from "antd"

const { TextArea } = Input

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
    const [auth, setAuth] = useContext(AuthContext);

    return (
        <>
            <TextArea
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                maxLength={50}
                disabled={auth?.user === null && auth?.token === ''} />
            <Button
                loading={loading}
                onClick={handleSubmit}
                size="large"
                type="primary"
                disabled={comment === ""}
                style={{
                    marginLeft: 400,
                    marginTop: 15,
                    borderRadius: 15,
                    fontFamily: "cursive"
                }}>Post</Button>
        </>
    )
}

export default CommentForm;