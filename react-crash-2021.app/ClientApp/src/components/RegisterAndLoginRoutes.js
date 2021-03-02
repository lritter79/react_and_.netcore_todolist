import Login from './api-authorization/Login'
import Register from './api-authorization/Register'
import Logout from './api-authorization/Logout'
import { Route, Redirect } from 'react-router-dom'
import Intro from './Intro'

const RegisterAndLoginRoutes = ({ setToken }) => {
    return (
        <>
            <Route exact path="/" component={Intro} >
            </Route>

            <Route path='/login' exact
                render={(props) => (
                    <Login
                        setToken={setToken}
                    />
                )}
            />

            <Route path='/register' exact component={Register} />
            <Route path='/logout' exact component={Logout} />

        </>
    )
}

export default RegisterAndLoginRoutes