
const Comment = ({ comment }) => (

        <div>
            <span>{comment.username}: </span>
            <span>{comment.text}</span>
        </div>
    )


export default Comment