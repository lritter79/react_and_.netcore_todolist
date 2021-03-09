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
                    <></>
                )}
            
            <CommentForm />
        </>
   )
}

export default CommentSection