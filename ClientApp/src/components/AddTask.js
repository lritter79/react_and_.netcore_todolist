import { useState } from 'react'
import Form from 'react-bootstrap/Form'

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
<Form onSubmit={onSubmit}>
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
    <Form.Label>Details: </Form.Label>
    <Form.Control 
            type='text'
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
  
  <button
      type='submit'
      className='btn btn-block'
      style={{ backgroundColor: 'skyblue' }}
    >
      Save Task
  </button>

</Form>
    
  )
}

export default AddTask
