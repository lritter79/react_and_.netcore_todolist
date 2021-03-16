//Handles the app's login flow.
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'
import { useState, useEffect } from 'react'
import { useShowToast } from '../toast/ToastContext'
import { useToken, useUserId }  from './UserContext'

const Login = () => {
    //when the form is submitted, we want to issue a post request to log in the user
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { setToken } = useToken()
    const { setUserId } = useUserId()

    const showToast = useShowToast()

    useEffect(() => {

        return function cleanup() {
            setUserName('')
            setPassword('')
        }
    }, [])

    const onSubmit = async e => {
        e.preventDefault()
        setDisabled(true)
        if (password === "") {
            setErrorMessage("Enter Password")
        }
        else {
            const token = await loginUser({
                username,
                password
            })

            if (!token.error) {
                setErrorMessage('')
                setUserId(token)
                setToken(token)
                
                showToast('success', `Welcome back, ${username}`)
            }
            else {
                setErrorMessage(token.error)
            }
        }
        setDisabled(false)
    }


    async function loginUser(credentials) {
        return fetch(`${Constant()}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(data => data.json())
            .catch((error) => error);

    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type='text'
                        maxLength='30'
                        placeholder=''
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <button
                    type='submit'
                    className='btn'
                    style={{ backgroundColor: 'skyblue' }}
                    disabled={disabled}
                >
                    Login
                </button>
            </Form>
            <p>
                {errorMessage}
            </p>
        </>
    )

}

export default Login