//Handles the app's login flow.
import Form from 'react-bootstrap/Form'
import Constant from './Constant'


const Login = () => {
    //when the form is submitted, we want to issue a post request to log in the user
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        
            const res = await fetch(`${Constant()}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            })

            const data = await res.json()

            return data
        }
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
                        value={userName}
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

export default Login