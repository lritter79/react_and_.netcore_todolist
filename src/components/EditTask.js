import { useState } from 'react'
import Button from './Button'

const EditTask = ({task, onSave, onCancel}) => {
    const [text, setText] = useState(task.text)
    const [day, setDay] = useState(task.day)
    const [details, setDetails] = useState('')
    const [location, setLocation] = useState('')
    const [reminder, setReminder] = useState(task.reminder)

    const onSubmit = (e) => {
        //e.preventDefault() is so it doesnt actually submit to the page
        e.preventDefault()
    
        //filters if text is blank
        if (!text) {
          alert('Please add a task')
          return
        }
    
        onSave({ text, details, location, day, reminder })
    
        //clears the form
        setText('')
        setDay('')
        setLocation('')
        setDetails('')
        setReminder(false)
      }
    
    return (
    <form className='edit-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input
                type='text'
                placeholder=''
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

        <input type='submit' value='Save Task' className='btn' />
        <Button
            color='red'
            text='Cancel'
            onClick={onCancel}
        />
    </form>)
    
}
export default EditTask