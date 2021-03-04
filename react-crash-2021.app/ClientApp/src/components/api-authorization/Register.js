//Handles the app's login flow.
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'

const Register = ({ setToken }) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async e => {
        e.preventDefault()

        if (password === confirmPassword) {
            const token = await registerUser({
                username,
                password
            })

            if (!token.error) {
                setErrorMessage('')
                setToken(token)
            }
            else {
                setErrorMessage(token.error)
            }
        }
        else {
            setErrorMessage("Passwords do not match")
        }


        
    }

    async function registerUser(credentials) {
            return fetch(`${Constant()}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })
                .then(data => data.json())
                .catch((error) => {
                    console.error('Fetch Error:', error);
                });

        
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
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <button
                    type='submit'
                    className='btn'
                    style={{ backgroundColor: 'skyblue' }}
                >
                    Sign Up
                </button>
            </Form>
            <p>
                {errorMessage}
            </p>
        </>
    )
    
}

export default Register