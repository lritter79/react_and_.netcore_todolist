import Task from './Task'
import { useState } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import CoolColor from './CoolColor'

//.map() takes in  a function
const Tasks = ({ tasks, onDelete, onToggle, onGoToDetail }) => {
    const [showCompleted, setShowCompleted] = useState(true)


  function toggleShowCompleted(e) {
    e.currentTarget.blur()
    setShowCompleted(!showCompleted)  
  }

    return (
        <>
            <label>
                <Toggle
                    id='toggleShowCompleted'
                    defaultChecked={showCompleted}
                    onChange={toggleShowCompleted}
                />
                <span>Show Completed Tasks?</span>
            </label>                

            {showCompleted ?
                (tasks.map((task, index) => (
                    <Task key={index} task={task} onDelete={onDelete} coolColor={CoolColor(index)} onToggle={onToggle} onGoToDetail={onGoToDetail} />
                ))
            ) : (
                tasks.filter(t => !t.isCompleted).map((task, index) => (
                    <Task key={index} task={task} onDelete={onDelete} coolColor={CoolColor(index)} onToggle={onToggle} onGoToDetail={onGoToDetail} />
                ))
            )}
            
        </>
  )
}

export default Tasks
