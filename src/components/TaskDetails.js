import { Link } from 'react-router-dom'

const TaskDetails = () => {
    //const [task, setTask] = useState([])


    
    return (
        <div>
            {/* <h3>
                {task.text}
            </h3>
            <p>
                {task.location}
            </p>
            <p>
                {task.day}
            </p>
            <p>
                {task.details}
            </p> */}
            <Link to='/'>Go Back</Link>
        </div>
    )
}

export default TaskDetails