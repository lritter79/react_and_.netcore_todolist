import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
//for authorization
//import authService from './api-authorization/AuthorizeService'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import Constant from './components/Constant'
import AddTask from './components/AddTask'
import AlertCenter from './components/AlertCenter'
import TaskDetails from './components/TaskDetails'
import About from './components/About'
import DeleteTask from './components/task-crud-operations/DeleteTask'
import FetchTask from './components/task-crud-operations/FetchTask'
import FetchTasks from './components/task-crud-operations/FetchTasks'
import useToken from './components/api-authorization/UseToken'
import UserManager from './components/api-authorization/UserManager'
import RegisterAndLoginRoutes from './components/RegisterAndLoginRoutes'
import Logout from './components/api-authorization/Logout'
import Toast from './components/toast/Toast';
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';
//import UpdateTask from './components/UpdateTask'
//function setToken(userToken) {
//    sessionStorage.setItem('token', JSON.stringify(userToken));

//}

//function getToken() {

//    const tokenString = sessionStorage.getItem('token');
//    const userToken = JSON.parse(tokenString);
//    //.? is the optional chain operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//    /*
//     You need to use the optional chaining operator—?.—when accessing the token property because when you 
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
    //showAddTask = current state
    //setShowAddTask = function that aloows you to update the current state
    //when you update state, the component rerenders
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //this is for authentication, see: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
    const { token, setToken } = useToken()
    const [userId, setUserId] = useState('')
    const [alerts, setAlerts] = useState([])
    const [list, setList] = useState([])
    const [checkValue, setCheckValue] = useState(true)
    const [autoDeleteTime, setAutoDeleteTime] = useState(3000)

    const showToast = (type, text) => {
        let toastProperties = null
        const id = Math.floor((Math.random() * 100) + 1)
        switch (type) {
            case 'addedReminder':
                toastProperties = {
                    id,
                    title: 'Added Reminder',
                    description: 'You have added a reminder',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                break
            case 'danger':
                toastProperties = {
                    id,
                    title: 'Danger',
                    description: `Error: ${text}`,
                    backgroundColor: '#d9534f',
                    icon: errorIcon
                }
                break
            case 'info':
                toastProperties = {
                    id,
                    title: 'Info',
                    description: 'This is an info toast component',
                    backgroundColor: '#5bc0de',
                    icon: infoIcon
                }
                break
            case 'warning':
                toastProperties = {
                    id,
                    title: 'Warning',
                    description: 'This is a warning toast component',
                    backgroundColor: '#f0ad4e',
                    icon: warningIcon
                }
                break
            default:
                setList([])
        }
        setList([...list, toastProperties])
    }
    //const testList = [
    //    {
    //        id: 1,
    //        title: 'Success',
    //        description: 'This is a success toast component',
    //        backgroundColor: '#5cb85c',
    //        icon: checkIcon
    //    },
    //    {
    //        id: 2,
    //        title: 'Danger',
    //        description: 'This is an error toast component',
    //        backgroundColor: '#d9534f',
    //        icon: errorIcon
    //    },
    //    {
    //        id: 3,
    //        title: 'Info',
    //        description: 'This is an info toast component',
    //        backgroundColor: '#5bc0de',
    //        icon: infoIcon
    //    },
    //    {
    //        id: 4,
    //        title: 'Warning',
    //        description: 'This is a warning toast component',
    //        backgroundColor: '#f0ad4e',
    //        icon: warningIcon
    //    }
    //]

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(null)
        setUserId(null)
    }


    function handleLogoutClick(e) {
        e.preventDefault()
        setTasks([])
        removeToken()
    }

    // Fetch Tasks
    //gets the tasks we have on the server with async java
    useEffect(() => {
        const getId = () => {
            console.log('%c using effect in app', 'background: #222, color:#87CEEB')
            const tokenString = sessionStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            setUserId(userToken?.id)
        }

        const fetchTasks = FetchTasks

        const getTasks = async () => {
            try {
                const tasksFromServer = await fetchTasks(userId, token)
                setIsLoading(false)
                setTasks(tasksFromServer)
            } catch (error) {
                showToast('danger', error)
            }
        }
        const fetchAlerts = async (id) => {
            const res = await fetch(Constant() + `/api/Users/${id}/alerts`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            const data = await res.json()

            return data
        }

        const getAlerts = async () => {
            try {
                const tasksFromServer = await fetchAlerts(userId)
                setIsLoading(false)
                setAlerts(tasksFromServer)
            } catch (error) {
                showToast('danger', error)
            }
        }

        getId()

        if (userId != null || userId != undefined) {
            getTasks()
            getAlerts()
        }
   

    }, [token, userId])



    // Fetch Task
    const fetchTask = FetchTask



    // Delete Task
    //takes in an id
    const onDelete = async (id) => {
        await DeleteTask(id, token)
        //.filter removes the task with the same id as the id passed up
        setTasks(tasks.filter((task) => task.id !== id))
        showToast('danger', 'You have deleted a task')
    }

    // Toggle Reminder
    //takes id so it knows which on to toggle
    const toggleReminder = async (id) => {
        try {
            const taskToToggle = await fetchTask(id, token)
            const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
            //const updateTask = UpdateTask
            //update is put
            // 
            const res = await fetch(`${Constant()}/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token             
                },
                body: JSON.stringify(updTask)
            })

            const data = await res.json()

            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, reminder: data.reminder } : task
                )
            )

            if (data.reminder) {
                showToast('addedReminder')
            }
        } catch (err) {
            showToast('danger', err)
        }
        
    }

    const updateTask = async (task) => {
        console.log(task)
        setTasks(
            tasks.map((oldTask) => task.id === oldTask.id ? task : oldTask)
        )
    }

    //if there are no tasks, it shows  'No Tasks To Show'
    //short ternary in jsx:
    // {x === y ? (<Thing />) : ('String')}
    //wrap everything in <Router> to use routes
    //exact menas match path exactly
    return (

        <Router>
            
            <div id="backdrop">
                
            </div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">    
                        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" exact>About</Nav.Link>      
                        {token ? (
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
                    toastList={list}
                    position="bottom-right"
                    autoDelete={checkValue}
                    dismissTime={autoDeleteTime}
                />
                    <Route path='/about' exact component={About} />
                    <Route path='/logout' exact component={Logout} />
                    {token ? (
                    <>
                        <Route path='/alerts' exact
                            render={(props) => (
                                <AlertCenter alerts={alerts} setAlerts={setAlerts} />
                            )}
                        />
                            <Redirect from='/login' to="/" />
                            <Route path='/userManager' exact
                                render={(props) => (
                                    <UserManager handleLogout={handleLogoutClick} token={token} id={userId} />
                                )}
                            />
                            <Route path='/' exact
                                render={(props) => (
                                    <>
                                        <Header
                                            onAdd={() => setShowAddTask(!showAddTask)}
                                            showAdd={showAddTask} />
                                        <AddTask isToggled={showAddTask} userId={userId} token={token} tasks={tasks} setTasks={setTasks} setShowAddTask={setShowAddTask} />
                                        {!isLoading ? (
                                            (tasks.length > 0) ? (
                                                <Tasks
                                                    tasks={tasks}
                                                    onDelete={onDelete}
                                                    onToggle={toggleReminder}
                                                    onGoToDetail={() => { setShowAddTask(false) }} />) :
                                                ('No Tasks To Show')
                                        ) : ('Loading ...')}
                                    </>

                                )} />

                            <Route path='/task/:id' exact
                                render={(props) => (
                                    <TaskDetails
                                        onUpdate={updateTask}
                                        userId={userId}
                                        token={token}
                                    />
                                )}
                            />
                            <Footer isLoggedIn={token} />
                        </>
                    ) : (
                            <>
                                <RegisterAndLoginRoutes setToken={setToken} token={token} />
                            </>

                        )}
            </div>
            
            
        </Router>
    )
}

export default App

