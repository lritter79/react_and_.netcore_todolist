import CommentForm from "./CommentForm"
import Comments from "./Comments"
import { useState, useEffect } from 'react'


const CommentSection = ({ comments, userId, token, taskId }) => {

    console.log(comments)

    
    return (
        <div className='commentSection'>
            {(comments?.length > 0) ? (
                <Comments comments={comments} />
            ) : (
                    <></>
                )}

            <CommentForm userId={userId} token={token} taskId={taskId} />
        </div>
   )
}

export default CommentSection