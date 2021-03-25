import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
//for authorization
//import authService from './api-authorization/AuthorizeService'
import Footer from './components/Footer'
import Constant from './components/Constant'
import * as signalR from '@microsoft/signalr'
import AlertCenter from './components/AlertCenter'
import About from './components/About'
import UserManager from './components/api-authorization/UserManager'
import UserFunctions from './components/api-authorization/UserFunctions'
import RegisterAndLoginRoutes from './components/api-authorization/RegisterAndLoginRoutes'
import Logout from './components/api-authorization/Logout'
import Toast from './components/toast/Toast'
import { useShowToast } from './components/toast/ToastContext'
import TaskDetails from './components/TaskDetails'
import TaskTracker from './components/task-tracker/TaskTracker'
import { useToken } from './components/api-authorization/UserContext'

//import UpdateTask from './components/UpdateTask'
//function setToken(userToken) {
//    sessionStorage.setItem('token', JSON.stringify(userToken));

//}

//function getToken() {

//    const tokenString = sessionStorage.getItem('token');
//    const userToken = JSON.parse(tokenString);
//    //.? is the optional chain operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//    /*
//     You need to use the optional chaining operator�?.�when accessing the token property because when you 
//     first access the application, the value of sessionStorage.getItem('token') will 
//     be undefined. If you try to access a property, you will generate an error.
//     */
//    return userToken?.token
//}
//import header and use it like an xml tag
//keeps tasks at the highest level (state)
//changes the state of tasks
//calls fetch tasks whihc returns a promise
//sets tasks as the state
const App = () => {
    
    const { token, setToken } = useToken()
    console.log(token)
    const [alerts, setAlerts] = useState([])
    const [checkValue, setCheckValue] = useState(true)
    const [autoDeleteTime, setAutoDeleteTime] = useState(5000)
    const showToast = useShowToast()
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(Constant() + "/api/alerts")
        .withAutomaticReconnect()
        .build()

    const getConnectionId = () => {
        this.hubConnection.invoke('getconnectionid').then(
            (data) => {
                console.log(data);
                this.connectionId = data;
            }
        )
    }

    const setAlertsOnLogin = async () => {
        let userAlerts = await UserFunctions.getAlertsByUser(token?.id, token?.token)
        setAlerts(userAlerts)
    }
    

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(null)
    }


    function handleLogoutClick(e) {
        e.preventDefault()       
        removeToken()
    }

    // Fetch Tasks
    //gets the tasks we have on the server with async java
    useEffect(() => {
        console.log('using effect in app component')
        // const fetchAlerts = async (id) => {
        //     const res = await fetch(Constant() + `/api/Users/${id}/alerts`, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Bearer ' + token
        //         }
        //     })

        //     const data = await res.json()

        //     return data
        // }

        // const getAlerts = async () => {
        //     try {
        //         //const tasksFromServer = await fetchAlerts(userId)
        //         //setAlerts(tasksFromServer)
        //     } catch (error) {
        //         showToast('error', error)
        //     }
        // }

        if (token != undefined) {
            setAlertsOnLogin()
            
            connection.start()
                //.then(async function () {
                //    try {
                //        let res = await connection.invoke('GetUserAlerts', userId)
                //        console.log(res)
                //    }
                //    catch (error) {
                //        console.log(error)
                //    }
                //})
                .then(result => {
                    console.log('building connenction')
                    //console.log(showToast);
                    //showToast('info', 'Connected!')
                    connection.on('sendToReact', alert => {
                        console.log(alert.message)
                        showToast('info', alert.message)
                        setAlerts(prev => [...prev, alert])
                        console.log(alerts)
                    })
                })
            .catch(e => console.log('Connection failed: ', e))
            

            //console.log(userId)
            //getAlerts()
        }
   
        return () => {
            console.log('clean up in app.js')
            if (token != undefined) {
                setAlerts([])
                connection.stop()
            }
            
            setAlerts([])
        }
    }, [token])

    //if there are no tasks, it shows  'No Tasks To Show'
    //short ternary in jsx:
    // {x === y ? (<Thing />) : ('String')}
    //wrap everything in <Router> to use routes
    //exact menas match path exactly
    return (
        
        <Router>        
                <>
                    <div id="backdrop">

                    </div>
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
                                        <Nav.Link as={NavLink} to="/alerts" exact>Alerts
                                        {(alerts.length > 0) ? (<span id='alertCounter'>{alerts.length}</span>) : (<></>)}
                                        </Nav.Link>
                                        <Nav.Link as={NavLink} to="/logout" exact onClick={handleLogoutClick}>Logout</Nav.Link>
                                    </>) : (<>
                                        <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
                                    </>)}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <div className='container'>
                        <Toast
                            position="bottom-right"
                            autoDelete={checkValue}
                            dismissTime={autoDeleteTime}
                        />
                        <Route path='/about' exact component={About} />
                        <Route path='/logout' exact component={Logout} />
                        {token?.token ? (
                            <>
                                <Route path='/alerts' exact
                                    render={(props) => (
                                        <AlertCenter alerts={alerts} setAlerts={setAlerts} />
                                    )}
                                />
                                <Redirect from='/login' to="/" />
                                <Route path='/userManager' exact
                                render={(props) => (
                                    <UserManager handleLogout={handleLogoutClick} />
                                    )}
                                />
                                <Route path='/' exact
                                    render={(props) => (
                                        <>
                                            <TaskTracker />
                                        </>

                                    )} />

                                <Route path='/task/:id' exact
                                    render={(props) => (
                                        <TaskDetails/>
                                    )}
                                />
                                
                            </>
                        ) : (
                                <>
                                    <RegisterAndLoginRoutes />
                                </>

                        )}
                        <Footer isLoggedIn={token?.token} />
                    </div>

                </>
        </Router>
            
    )
}

export default App

