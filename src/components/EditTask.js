import { useState } from 'react'


const EditTask = ({task, onChange, onSubmit}) => {
    const [text, setText] = useState(task.text)
    const [day, setDay] = useState(task.day)
    const [reminder, setReminder] = useState(task.reminder)
    
    return (<form className='edit-form' onSubmit={onSubmit}>
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
  </form>)
    
}
export default EditTask