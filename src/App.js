import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import TaskDetails from './components/TaskDetails'
import About from './components/About'

//import header and use it like an xml tag
//keeps tasks at the highest level (state)
//changes the state of tasks
//calls fetch tasks whihc returns a promise
//sets tasks as the state
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {    
    const getTasks = async () => {          
      try {
        console.log("getting tasks")  
        const tasksFromServer = await fetchTasks()         
        setTasks(tasksFromServer)
      }catch (error) {
        console.log("failed") 
        console.log(error);
      }   
    }
      getTasks()
    
  }, [])

  // Fetch Tasks
  //gets the tasks we have on the server with async java
  const fetchTasks = async () => {  
    console.log("fetching") 
    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  //post because we're adding tasks
  //turns it from js object into json string
  const addTask = async (task) => {   
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },   
      body: JSON.stringify(task),
    })

    //data returned is the new task
    const data = await res.json()
    //take existings takes and add data on
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  //takes in an id
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
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

    //update is put
    //
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
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


  //if there are no tasks, it shows  'No Tasks To Show'
  //short ternary in jsx:
  // {x === y ? (<Thing />) : ('String')}
  //wrap everything in <Router> to use routes
  //exact menas match path exactly
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Route path='/:id' component={TaskDetails} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
