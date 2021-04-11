import CommentForm from "./CommentForm"
import Comments from "./Comments"
import { useState } from 'react'


const CommentSection = ({ comments, setComments, taskId }) => {
    
    return (
        <div className='commentSection'>
            {(comments?.length > 0) ? (
                <Comments comments={comments} />
            ) : (
                    <></>
                )}

            <CommentForm taskId={taskId} comments={comments} setComments={setComments} />
        </div>
   )
}

export default CommentSection