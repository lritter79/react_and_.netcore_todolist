import Login from './Login'
import Register from './Register'
import { Route, Redirect  } from 'react-router-dom'
import Intro from '../Intro'


const RegisterAndLoginRoutes = () => {
    return (
        <>
            <Redirect from='/userManager' to="/" />
            <Route exact path="/" component={Intro} />

            <Route path='/login' exact
                render={(props) => (
                    <Login/>
                )}
            />

            <Route path='/register' exact
                render={(props) =>
                    <Register/>
                }
            />
            

        </>
    )
}

export default RegisterAndLoginRoutes