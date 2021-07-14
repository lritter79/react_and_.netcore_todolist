import { Navbar, Nav } from 'react-bootstrap'
import { useToken } from './api-authorization/UserContext'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AppNavbar = ({ onLogoutClick, alerts }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { token } = useToken()

    useEffect(() => {
        //console.log('nav bar render')

        return () => {
            //console.log('nav bar clean up')
        }
    }, [])

    useEffect(() => {
        //console.log('nav bar token use effect')

        if (!token?.token) setIsExpanded(false)
    }, [token])

    const logoutAndCollapse = (e) => {
        setIsExpanded(false)
        onLogoutClick(e)
    }

    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top" expanded={isExpanded} >
                <Navbar.Brand>Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(isExpanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/about" exact>About</Nav.Link>
                        {token?.token ? (
                            <>
                                <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/userManager" exact>Manage Account</Nav.Link>
                                <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/categories">Categories</Nav.Link>
                                <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/alerts" exact>Alerts
                                        {(alerts.length > 0) && (<span id='alertCounter'>{alerts.length}</span>)}
                                </Nav.Link>
                                <Nav.Link as={NavLink} onClick={logoutAndCollapse} to="/logout" exact>Logout</Nav.Link>
                            </>) : (<>
                                <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/login" exact>Login</Nav.Link>
                                <Nav.Link as={NavLink} onClick={() => setIsExpanded(false)} to="/register" exact>Register</Nav.Link>
                            </>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
        
    
}

export default AppNavbar
