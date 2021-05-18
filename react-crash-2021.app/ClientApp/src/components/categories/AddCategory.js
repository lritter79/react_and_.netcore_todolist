import Form from 'react-bootstrap/Form'
import Colors from './Colors'
import { useState } from 'react'
import CategoryCrudOperations from './CategoryCrudOperations'
import { useToken } from '../api-authorization/UserContext'

const AddCategory = ({ token, categories, setCategories }) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    
    
    const onSubmit = async (e) => {
      e.preventDefault()
      if (name === '') {
        alert('Please enter a category name')
        return
      }

      let category = await CategoryCrudOperations.postCategory(token.token, {name, color, userId: token?.id})
      console.log(category)
      if (!('error' in category)) {
        setCategories([...categories, category])
      }
      else {
        alert(category)
      }

      setName('')
      setColor('')
      
    }

    return (
        <>
        <h1>Add a category</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control 
                        type='text'
                        maxLength='40'
                        placeholder=''
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Color:</Form.Label>
            <Form.Control
              as='select'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {Colors.map((color, index) => 
                <option key={index} value={color}>{color}</option>
              )}
              
            </Form.Control>
          </Form.Group>
          
          <button
              type='submit'
              className='btn btn-block'
              style={{ backgroundColor: 'skyblue', color: 'white' }}
            >
              Save
          </button>
        </Form>  
        </>
    )
}

export default AddCategory