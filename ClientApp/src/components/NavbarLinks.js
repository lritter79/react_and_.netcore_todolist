import { Fragment } from "react"
import { BrowserRouter as NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const NavbarLinks = ({ isLoggedIn }) => {

    if (isLoggedIn) {
        return (
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                <Nav.Link as={NavLink} to="/about" exact>About</Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>     
            </Nav>
                
            
        )
    }

    return (

        <Nav className="mr-auto">

            <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>

        </Nav>
    )
}

export default NavbarLinks