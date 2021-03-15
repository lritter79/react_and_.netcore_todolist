import CommentForm from "./CommentForm"
import Comments from "./Comments"
import { useState, useEffect } from 'react'


const CommentSection = ({ comments, taskId }) => {

    console.log(comments)

    
    return (
        <div className='commentSection'>
            {(comments?.length > 0) ? (
                <Comments comments={comments} />
            ) : (
                    <></>
                )}

            <CommentForm taskId={taskId} />
        </div>
   )
}

export default CommentSection