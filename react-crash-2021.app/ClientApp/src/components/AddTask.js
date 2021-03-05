import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from './Constant'

//take in the function onAdd
const AddTask = ({ isToggled, userId, token, tasks, setTasks, onAdd, setShowAddTask }) => {
  //more info on what the "useSate" hook does here: https://reactjs.org/docs/hooks-state.html
  //in a nutshell useState  is what we use to deal with properties in a function because functions cant have properties
  const [text, setText] = useState('')
  const [details, setDetails] = useState('')
  const [location, setLocation] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

    // Add Task
    //post because we're adding tasks
    //turns it from js object into json string
    async function addTask(task) {
        
        return fetch(Constant() + '/api/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(task)
        })
           .then(data => data.json())
           .catch((error) => {
               console.error('Fetch Error:', error);
           });

        
    }

  const onSubmit = async (e) => {
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

      const didAdd = await addTask({ text, details, location, day, reminder, userId, isCompleted:false })
      console.log(didAdd)
      //data returned is the new task
      //const data = await res.json()
      //take existings takes and add data on
      if (!didAdd?.error) {
          setTasks([...tasks, didAdd])
          setShowAddTask(false)
          //clears the form
          setText('')
          setDay('')
          setLocation('')
          setDetails('')
          setReminder(false)
      }

  }


  return (
    <div className={isToggled ? 'taskForm' : 'taskForm hidden'}>
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
        
        <button
            type='submit'
            className='btn btn-block'
            style={{ backgroundColor: 'skyblue' }}
          >
            Save Task
        </button>

      </Form>
    </div>

    
  )
}

export default AddTask
