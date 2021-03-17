import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import Comment from "./Comment"

const Comments = ({ comments }) => {
    //console.log(comments)
   
    return (
        <>
            {comments.map((c, index) => (
                <Comment key={index} comment={c} />
            ))}
        </>
    )
}

export default Comments