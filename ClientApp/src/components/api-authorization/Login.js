﻿//Handles the app's login flow.
import Form from 'react-bootstrap/Form'
const Login = () => {
    return (
        <>
            <Form>
                <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control 
                            type='text'
                            maxLength='30'
                            placeholder='' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
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

export default Login