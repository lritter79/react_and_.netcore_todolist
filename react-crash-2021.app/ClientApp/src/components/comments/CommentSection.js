import CommentForm from "./CommentForm"
import Comments from "./Comments"
import { useState, useEffect } from 'react'


const CommentSection = ({ comments }) => {

    console.log(comments)

    
    return (
        <>
            <p>Comments</p>
            {(comments?.length > 0) ? (
                <Comments comments={comments} />
            ) : (
                    <p>No Comments</p>
                )}
            
            <CommentForm />
        </>
   )
}

export default CommentSection