import Task from './Task'
import { useState } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

//.map() takes in  a function
const Tasks = ({ tasks, onDelete, onToggle, onGoToDetail }) => {
    const [showCompleted, setShowCompleted] = useState(true)
  const coolColor = (i) => {
    i = i > 3 ? i % 4 : i 
    switch(i) {
      case 0:
        return 'pink';
      case 1:
        return 'white';
      case 2:
        return 'orange';
      case 3:
          return 'green';
      default:
        return '';
    }
  }

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
                    <Task key={index} task={task} onDelete={onDelete} coolColor={coolColor(index)} onToggle={onToggle} onGoToDetail={onGoToDetail} />
                ))
            ) : (
                tasks.filter(t => !t.isCompleted).map((task, index) => (
                    <Task key={index} task={task} onDelete={onDelete} coolColor={coolColor(index)} onToggle={onToggle} onGoToDetail={onGoToDetail} />
                ))
            )}
            
        </>
  )
}

export default Tasks
