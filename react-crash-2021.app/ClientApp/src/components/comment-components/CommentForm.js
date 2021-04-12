import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'
import { useToken } from '../api-authorization/UserContext'
import userFunctions from '../api-authorization/UserFunctions'

const CommentForm = ({ taskId, comments, setComments,  }) => {
    const [text, setText] = useState('')
    const { token, setToken } = useToken()
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {

        const getUser = async () => {
            try {
                //
                //(CrudOperations)                               

                //console.log('getting user')
                //console.log(`user = ${userId}`)
                if (token != undefined) {
                    const userData = await userFunctions.getUser(token?.id, token?.token)
                    setUser(userData)
                    setIsLoading(false)         
                }

            } catch (error) {
                console.log(error)
            }
        }

        getUser()

    }, [])

    const onSubmit = async (e) => {
        //e.preventDefault() is so it doesnt actually submit to the page
        e.preventDefault()
        setText('')
        await fetch(Constant() + '/api/comments', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token?.token
            },
            body: JSON.stringify({ userId: token?.id, taskId, text, userName: user.userName })
        })
            .then(data => {
                console.log({ userId: token?.id, taskId, text, userName: user.userName })
                data.json()
                setComments(prev => [...prev, { userId: token?.id, taskId, text, userName: user.userName }])
            })
            .catch((error) => {
                console.error('Fetch Error:', error);
            })
    }


    return (
        !isLoading && (
            <div className='commentForm'>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            maxLength='200'
                            placeholder=''
                            value={text}
                            onChange={(e) => setText(e.target.value)} />
                    </Form.Group>

                    <button
                        type='submit'
                        className='btn btn-block'
                        style={{ backgroundColor: 'skyblue' }}
                    >
                        Add Comment
                </button>
                </Form>
            </div>
        )
       
    )
}

export default CommentForm