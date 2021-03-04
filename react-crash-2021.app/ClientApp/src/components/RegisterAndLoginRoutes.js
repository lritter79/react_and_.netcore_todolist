import Login from './api-authorization/Login'
import Register from './api-authorization/Register'
import { Route, Redirect  } from 'react-router-dom'
import Intro from './Intro'


const RegisterAndLoginRoutes = ({ setToken}) => {
    return (
        <>
            <Redirect from='/userManager' to="/" />
            <Route exact path="/" component={Intro} />

            <Route path='/login' exact
                render={(props) => (
                    <Login
                        setToken={setToken}
                    />
                )}
            />

            <Route path='/register' exact
                render={(props) =>
                    <Register setToken={setToken} />
                }
            />
            

        </>
    )
}

export default RegisterAndLoginRoutes