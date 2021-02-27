
//Handles the app's login flow.
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ setToken }) => {
    //when the form is submitted, we want to issue a post request to log in the user
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        

    }


    async function loginUser(credentials) {
        return fetch(`${Constant()}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        .then(data => data.json)

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
                    >
                    Login
                </button>
            </Form>
        </>
    )
    
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login