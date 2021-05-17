import Constant from '../Constant'
import CrudOperations from '../task-crud-operations/CrudOperations'
import Header from '../task-tracker/Header'
import AddTask from '../task-tracker/AddTask'
import Tasks from '../task-tracker/Tasks'
import { useState, useEffect } from 'react'
import { useShowToast } from '../toast/ToastContext'
import { useToken} from '../api-authorization/UserContext'
import Calendar from './Calendar'
import Button from '../Button'
import CategoryCrudOperations from '../categories/CategoryCrudOperations'

const TaskTracker = () => {
        //showAddTask = current state
    //setShowAddTask = function that aloows you to update the current state
    //when you update state, the component rerenders
    const { token } = useToken()
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const showToast = useShowToast()
    const [showCalendarView, setShowCalendarView] = useState(false)
    const [categories, setCategories] = useState([])
   
    useEffect(() => {
        //console.log('task tracker use effect')
        const getCategories = async () => {
            try {
                //console.log(CrudOperations)                               
                //console.log(`token = ${token}`)
                //console.log(`user = ${userId}`)
                if (token !== undefined) {
                    let catsFromServer = (await CategoryCrudOperations.getCategoriesByUser(token?.id, token?.token))  
                    catsFromServer.unshift({name: 'Choose...', id:''})             
                    console.log(catsFromServer)
                    setCategories(catsFromServer)
                }
                
            } catch (error) {
                //showToast('error', error)
            }
        }
  
        getCategories()

        const getTasks = async () => {
            try {
                //console.log(CrudOperations)                               
                //console.log(`token = ${token}`)
                //console.log(`user = ${userId}`)
                if (token != undefined) {
                    const tasksFromServer = await CrudOperations.FetchTasks(token?.id, token?.token)
                    setIsLoading(false)
                    setTasks(tasksFromServer)
                }
                
            } catch (error) {
                showToast('error', error)
            }
        }

        getTasks()

        return function cleanup() {
            setTasks([])
        }
    }, [])

    const onDelete = async (id) => {
        await CrudOperations.DeleteTask(id, token?.token)
        //.filter removes the task with the same id as the id passed up
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    //takes id so it knows which on to toggle
    const toggleReminder = async (taskToToggle) => {
        try {
            //const taskToToggle = await CrudOperations.FetchTask(id, token)
            const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
            //console.log(updTask)
            const res = await fetch(`${Constant()}/api/tasks/${taskToToggle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token?.token
                },
                body: JSON.stringify(updTask)
            })

            const data = await res.json()

            setTasks(
                tasks.map((task) =>
                    task.id === taskToToggle.id ? { ...task, reminder: data.reminder } : task
                )
            )
        } catch (error) {
            showToast('error', 'error')
        }

    }

    const updateTask = async (task) => {
        //console.log(task)
        setTasks(
            tasks.map((oldTask) => task.id === oldTask.id ? task : oldTask)
        )
    }

    function calendarBtnClick(e) {
        e.currentTarget.blur()
        setShowCalendarView(!showCalendarView)
    }


    return (
        <>
            <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask} />
            <AddTask isToggled={showAddTask}
                tasks={tasks} setTasks={setTasks}
                setShowAddTask={setShowAddTask}
                categories={categories} />
            <div id='divBtnContainer'>
                <Button text={showCalendarView ? ('Show List View') : ('Show Calendar View')}
                    textColor='white'
                    onClick={calendarBtnClick}
                />
            </div>
            {!isLoading ? (
                (tasks.length > 0) ? (
                    (showCalendarView) ?
                        (<Calendar tasks={tasks} setTasks={setTasks} />) :
                        (<Tasks
                            tasks={tasks}
                            categories={categories}
                            onDelete={onDelete}
                            onToggle={toggleReminder}
                            onGoToDetail={() => { setShowAddTask(false) }} />)
                    ) :
                    ('No Tasks To Show')
            ) : ('Loading ...')}
        </>
    )
}

export default TaskTracker