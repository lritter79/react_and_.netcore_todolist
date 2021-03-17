import Task from './Task'
import { useState } from 'react'

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

    return (
        <>
            <div id='tasksFilter'>
                <span>Show Completed Tasks?
                    <input
                        checked={showCompleted}
                        onChange={() => setShowCompleted(!showCompleted)}
                        type="checkbox"
                    />
                </span>
            </div>
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
