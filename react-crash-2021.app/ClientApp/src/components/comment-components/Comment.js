import FormatDateString from '../FormatDateString'
const Comment = ({ comment }) => (

        <div className='comment'>
            <span style={{ fontWeight: 'bold' }}>{comment.userName}: </span>
            <span>{FormatDateString(comment.date)}</span>
            <br />
            <span>{comment.text}</span>      
        </div>
    )


export default Comment