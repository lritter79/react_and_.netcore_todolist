
const Comment = ({ comment }) => (

        <div className='comment'>
            <span style={{ fontWeight: 'bold' }}>{comment.userName}: </span>
            <span>{comment.date}</span>
            <br />
            <span>{comment.text}</span>      
        </div>
    )


export default Comment