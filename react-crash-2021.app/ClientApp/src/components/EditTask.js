import { useState } from 'react'
import Button from './Button'
import Form from 'react-bootstrap/Form'
import { useToken } from './api-authorization/UserContext'

const EditTask = ({task, onCancel, onUpdate }) => {
    const [id, setId] = useState(task.id)
    const [text, setText] = useState(task.text)
    const [day, setDay] = useState(task.day)
    const [details, setDetails] = useState(task.details)
    const [category, setCategory] = useState(task.category)
    const [location, setLocation] = useState(task.location)
    const [reminder, setReminder] = useState(task.reminder)
    const [isCompleted, setIsCompleted] = useState(task.isCompleted)
    const { token, setToken } = useToken()

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

        onUpdate({ id, text, details, location, day, reminder, isCompleted, category }, token)
    
        //clears the form
        setId('')
        setText('')
        setDay('')
        setLocation('')
        setCategory('')
        setDetails('')
        setReminder(false)
      }
    
    return (
<Form onSubmit={onSubmit} className="taskName">
  <Form.Group>
    <Form.Label>Task</Form.Label>
    <Form.Control 
                type='text'
                maxLength='30'
                placeholder=''
                value={text}
                onChange={(e) => setText(e.target.value)} />
  </Form.Group>

  <Form.Group>
    <Form.Label>Location: </Form.Label>
    <Form.Control 
            type='text'
            placeholder=''
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
  </Form.Group>
  <Form.Group>
    <Form.Label>Category: </Form.Label>
    <Form.Control 
            type='text'
            placeholder=''
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
  </Form.Group>
  <Form.Group>
    <Form.Label>Details: </Form.Label>
    <Form.Control 
            as="textarea"
            rows={3}
            placeholder=''
            value={details}
            onChange={(e) => setDetails(e.target.value)}
             />
  </Form.Group>
  <Form.Group>
    <Form.Label>Day & Time</Form.Label>
    <Form.Control 
            type='datetime-local'
            placeholder='Add Day & Time'
            value={day}
            onChange={(e) => setDay(e.target.value)}/>
  </Form.Group>
  <Form.Group>
    <Form.Check 
    type="checkbox" 
    label="Set Reminder"
    checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)} />
 </Form.Group>
 <Form.Group>
    <Form.Check 
    type="checkbox" 
                    label="Completed?"
                    checked={isCompleted}
                    value={isCompleted}
            onChange={(e) => setIsCompleted(e.currentTarget.checked)} />
  </Form.Group>
  
  <button
      type='submit'
      className='btn'
      style={{ backgroundColor: 'skyblue' }}
    >
      Save Task
  </button>
  <Button
            color='red'
            text='Cancel'
            onClick={onCancel}
        />
</Form>
)
    
}
export default EditTask