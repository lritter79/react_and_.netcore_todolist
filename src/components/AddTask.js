import { useState } from 'react'

//take in the function onAdd
const AddTask = ({ onAdd }) => {
  //more info on what the "useSate" hook does here: https://reactjs.org/docs/hooks-state.html
  //in a nutshell useState  is what we use to deal with properties in a function because functions cant have properties
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    //e.preventDefault() is so it doesnt actually submit to the page
    e.preventDefault()

    //filters if text is blank
    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day, reminder })

    //clears the form
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add Day & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask
