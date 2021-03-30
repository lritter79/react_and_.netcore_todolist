import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import FormatDateString from '../FormatDateString'

//fatimes is a preloaded react component for the delete "x" icon

//the onDelete prop is the a function that gets passed in
//`` backticks in double brackets are use for expressions
//if task.reminder is true then it should have class reminder
//else it will have an empty string as class
const Task = ({ task, onDelete, onToggle, coolColor, onGoToDetail }) => {
    const dayInlineStyle = coolColor === 'white' ? { color: coolColor, textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' } : { color: coolColor }
    const borderStyle = task.isCompleted ? { borderTop: '5px solid ' + coolColor, opacity: '50%' } : { borderTop: '5px solid ' + coolColor }

  return (
    <div style={borderStyle}
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      {task?.day && (
        <p style={dayInlineStyle}>
          {FormatDateString(task.day)}
        </p>
      )}
      
          {(task.deadlineMessage) && (
              <>
                  <p style={{ color: task.deadlineMessage.color, fontWeight: task.deadlineMessage.fontWeight }}>
                      {task.deadlineMessage.message}
                  </p>
              </>
          )}         
          <Link to={`/task/${task.id}`} onClick={onGoToDetail} className='detailsLink'>Details</Link>
          
    </div>
  )
}

export default Task
