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
import TaskDetails from './components/TaskDetails'
import About from './components/About'
import FetchTask from './components/FetchTask'
import useToken from './components/api-authorization/UseToken'
import UserManager from './components/api-authorization/UserManager'
import RegisterAndLoginRoutes from './components/RegisterAndLoginRoutes'
import Logout from './components/api-authorization/Logout'

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
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //this is for authentication, see: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
    const { token, setToken } = useToken()
    const [userId, setUserId] = useState()

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
        
        const fetchTasks = async (id) => {
            const res = await fetch(Constant() + `/api/Users/${id}/tasks`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            const data = await res.json()

            return data
        }

        const getTasks = async () => {
            try {
                const tasksFromServer = await fetchTasks(userId)
                setIsLoading(false)
                setTasks(tasksFromServer)
            } catch (error) {
                console.log("failed to fetch tasks")
                console.log(error)
            }
        }

        getId()

        if (userId != null || userId != undefined) {
            getTasks()
        }
   

    }, [token, userId])



    // Fetch Task
    const fetchTask = FetchTask



    // Delete Task
    //takes in an id
    const deleteTask = async (id) => {
        await fetch(`${Constant()}/api/tasks/${id}`, {
            method: 'DELETE',
        })
        //.filter removes the task with the same id as the id passed up
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    //takes id so it knows which on to toggle
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
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
            body: JSON.stringify(updTask),
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        )
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
                        {token ? (
                            <>
                                <Nav.Link as={NavLink} to="/logout" exact onClick={handleLogoutClick}>Logout</Nav.Link>
                                <Nav.Link as={NavLink} to="/userManager" exact>Manage Account</Nav.Link>
                            </>) : (<>
                                <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
                            </>)}
                        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" exact>About</Nav.Link>                                               
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
                <div className='container'>
                    <Route path='/about' exact component={About} />
                    <Route path='/logout' exact component={Logout} />
                    {token ? (
                        <>
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
                                                    onDelete={deleteTask}
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

