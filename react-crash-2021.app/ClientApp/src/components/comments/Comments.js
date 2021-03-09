import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import Comment from "./Comment"

const Comments = ({ comments }) => {
    console.log(comments)
    //{
    //    (comments?.length > 0) ?
    //    (
    //        comments.map((comment, index) => (
    //            <Comment comment={comment} />
    //        ))
    //    ) : (
    //        <p>No comments</p>
    //    )
    //}     
    return (
        <>
            {comments.map((c, index) => (
                <Comment comment={c} />
            ))}
        </>
    )
}

export default Comments