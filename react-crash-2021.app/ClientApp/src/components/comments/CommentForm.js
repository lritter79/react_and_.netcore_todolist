import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const CommentForm = () => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        //e.preventDefault() is so it doesnt actually submit to the page
        e.preventDefault()
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        maxLength='200'
                        placeholder='Add Reply'
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                </Form.Group>

                <button
                    type='submit'
                    className='btn btn-block'
                    style={{ backgroundColor: 'skyblue' }}
                >
                    Reply
                </button>
            </Form>
        </div>
    )
}

export default CommentForm