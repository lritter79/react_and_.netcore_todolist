import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
//fatimes is a preloaded react component for the delete "x" icon

//the onDelete prop is the a function that gets passed in
//`` backticks in double brackets are use for expressions
//if task.reminder is true then it should have class reminder
//else it will have an empty string as class
const Task = ({ task, onDelete, onToggle, coolColor }) => {
  const dayInlineStyle = {color: coolColor}
  // const coolColor = (id) => {
  //   id = id > 3 ? id % 4 : id 
  //   switch(id) {
  //     case 0:
  //       return 'pink';
  //     case 1:
  //       return 'white';
  //     case 2:
  //       return 'orange';
  //     case 3:
  //         return 'green';
  //     default:
  //       return '';
  //   }
  // }

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p 
        style={dayInlineStyle}
      >
        {task.day}
      </p>
      <Link to={'/task/' + task.id} className='detailsLink'>Details</Link>
    </div>
  )
}

export default Task
