import Login from './api-authorization/Login'
import Register from './api-authorization/Register'
import { Route, Redirect } from 'react-router-dom'

const RegisterAndLoginRoutes = ({ setToken }) => {
    return (
        <>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>

            <Route path='/login' exact
                render={(props) => (
                    <Login
                        setToken={setToken}
                    />
                )}
            />
            <Route path='/register' exact component={Register} />


        </>
    )
}

export default RegisterAndLoginRoutes