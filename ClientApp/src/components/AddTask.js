import { useState } from 'react'

//take in the function onAdd
const AddTask = ({ onAdd }) => {
  //more info on what the "useSate" hook does here: https://reactjs.org/docs/hooks-state.html
  //in a nutshell useState  is what we use to deal with properties in a function because functions cant have properties
  const [text, setText] = useState('')
  const [details, setDetails] = useState('')
  const [location, setLocation] = useState('')
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

    if (!day) {
      alert('Please add a datetime')
      return
    }

    onAdd({ text, details, location, day, reminder })

    //clears the form
    setText('')
    setDay('')
    setLocation('')
    setDetails('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          maxLength='30'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Detail</label>
        <input
          type='text'
          placeholder=''
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Location</label>
        <input
          type='text'
          placeholder=''
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='datetime-local'
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
