import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Button from './Button'
import EditTask from './EditTask'
import FormatDateString from './FormatDateString'
import FetchTask from './task-crud-operations/FetchTask'
import CommentSection from './comment-components/CommentSection'
import { useShowToast } from './toast/ToastContext'
import { useToken } from './api-authorization/UserContext'
import UpdateTask from './task-crud-operations/UpdateTask'

const TaskDetails = () => {

    //gets the params passed in from the router
    //is a react hook
    const { id } = useParams()
    const { token } = useToken()
    const [isLoading, setIsLoading] = useState(true);
    const [task, setTask] = useState(null)
    const [showEditTask, setShowEditTask] = useState(false)
    const [comments, setComments] = useState()
    const showToast = useShowToast() 
    const history = useHistory();
   

    useEffect(() => {
        //console.log("using effect: task details")
        // Fetch Task
        const fetchTask = FetchTask

        const getTask = async () => {          
            try {       
                const taskFromServer = await FetchTask(id, token?.token)         
                setTask(taskFromServer)
                //console.log(taskFromServer)
                //setComments(taskFromServer.comments)
                setIsLoading(false)
            } catch (error) {
                console.log("failed") 
                console.log(error);
            }   
        }
      
        getTask()

    }, []) 

    const onCancel = () => {
        setShowEditTask(!showEditTask)
    }

    const update = async (task) => {
        setIsLoading(true)
        try {
            task.userId = token?.id
            setShowEditTask(!showEditTask)
            const updTask = await UpdateTask(task, token?.token)
            setTask(updTask)
            setIsLoading(false)
            showToast('success', `Updated "${task.text}"`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!isLoading ? (
                <div>    
                    {!showEditTask && (
                        <div className="taskDetail">
                            <h3>
                                {task.text}
                            </h3>
                            <hr></hr>
                            <p>
                                Category: {task.category}
                            </p>
                            <p>
                                Location: {task.location}
                            </p>
                            {task?.day &&
                                (<p>
                                    Day: {FormatDateString(task.day)}
                                </p>)
                            }
                            
                            <p>
                                Details: {task.details !== undefined ? task.details : "None"}
                            </p>    
                            { task.isCompleted && (
                                <p>Completed On: {FormatDateString(task.dateCompleted)}</p>
                            )}
                            <Button
                                color='green'
                                text='← Back'
                                onClick={history.goBack}
                            />
                            <Button                                
                                text='Edit Task'
                                onClick={() => setShowEditTask(!showEditTask)}
                            />
                            
                            {(comments != undefined) && (
                                <CommentSection comments={comments} taskId={id} /> 
                            )}                         
                        </div>
                    )}                               

                    {showEditTask && (
                        <EditTask task={task} onUpdate={update} onCancel={onCancel} />
                    )}        
                </div>) : (
                <div>
                    <h1>Loading ...</h1>
                </div>
            )}           
        </>        
    )
}

export default TaskDetails