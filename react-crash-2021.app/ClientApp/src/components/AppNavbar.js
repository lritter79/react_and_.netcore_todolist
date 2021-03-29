import { Navbar, Nav } from 'react-bootstrap'
import { useToken } from './api-authorization/UserContext'
import { NavLink } from 'react-router-dom'

const AppNavbar = ({ onLogoutClick, alerts }) => {

    const { token } = useToken()
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" exact>About</Nav.Link>
                        {token?.token ? (
                            <>
                                <Nav.Link as={NavLink} to="/userManager" exact>Manage Account</Nav.Link>
                                <Nav.Link as={NavLink} to="/calendar" exact>Calendar</Nav.Link>
                                <Nav.Link as={NavLink} to="/alerts" exact>Alerts
                                        {(alerts.length > 0) ? (<span id='alertCounter'>{alerts.length}</span>) : (<></>)}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" exact onClick={onLogoutClick}>Logout</Nav.Link>
                            </>) : (<>
                                <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
                            </>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
        
    
}

export default AppNavbar
