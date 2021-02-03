import Task from './Task'

//.map() takes in  a function
const Tasks = ({ tasks, onDelete, onToggle }) => {
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
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} coolColor={coolColor(index)} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks
