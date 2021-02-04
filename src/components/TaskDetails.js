import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const TaskDetails = () => {

    //gets the params passed in from the router
    //is a react hook
    let { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [task, setTask] = useState(null)

    useEffect(() => {
        console.log("using effect")
        // Fetch Task
        const fetchTask = async (id) => {
            const res = await fetch(`http://localhost:5000/tasks/${id}`)
            const data = await res.json()
            console.log("getting task")  
            return data
        }

        const getTask = async () => {          
            try {       
            const taskFromServer = await fetchTask(id)         
            setTask(taskFromServer)
            setIsLoading(false)
            } catch (error) {
            console.log("failed") 
            console.log(error);
            }   
        }
      
        getTask()

    }, [id]) 

    return (
        <>
            {!isLoading && (<div>
                <h3>
                    {task.text}
                    {id}
                </h3>
                <p>
                    {task.location}
                </p>
                <p>
                    {task.day}
                </p>
                <p>
                    {task.details}
                </p>
                <Link to='/'>Go Back</Link>
            </div>)}
        </>        
    )
}

export default TaskDetails