import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'
import userFunctions from './UserFunctions'
import { useShowToast } from '../toast/ToastContext'
import { useToken, useUserId }  from './UserContext'

const UserManager = ({ handleLogout }) => {
    //console.log(`id: ${id}`)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState('')
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [deleteDisabled, setDeleteDisabled] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const onSave = useShowToast()
    const { token, setToken } = useToken()
    const { userId, setUserId } = useUserId()
    //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {

        const getUser = async () => {
            try {
                //console.log(CrudOperations)                               
                //console.log(`token = ${token}`)
                //console.log(`user = ${userId}`)
                if (userId != undefined) {
                    const userData = await userFunctions.getUser(userId, token)
                    setUser(userData)
                    setIsLoading(false)
                }

            } catch (error) {
                onSave('error', error)
            }
        }

        getUser()
        
    }, [])

    useEffect(() => {
        return function cleanup() {
            //console.log('clean up')
        }
    }, [])

    useEffect(() => {
        //console.log('user use effect')
        //if (isChecked != undefined) {
        //    //const updatedUser = await userFunctions.saveUser({ user, id, token })        
        //}
        //else {
        //    console.log('first time')
        //}
        //console.log('set')
    }, [user])

    useEffect(() => {
        console.log('isLoading use effect')
    }, [isLoading])

    


    async function updateUser(appUser) {
        
        return fetch(`${Constant()}/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(appUser),
        })
            .then(function (data) {
               onSave('success', 'Your changes have been saved')
               return data.json()
            })
            .catch((error) => {
               onSave('error', error)
            })
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const onSubmit = async e => {
        e.preventDefault()
        setSubmitDisabled(true)
        let res = await updateUser(user)  
        await sleep(1000)
        setSubmitDisabled(false)
    }

    const onSubmitDelete = async e => {
        e.preventDefault()
        setDeleteDisabled(true)
        setShowDeleteForm(true)
        //handleLogout(e)
        //let res = await deleteAccount(id)
    }

    const onDelete = async e => {
        e.preventDefault()
        handleLogout(e)
        let res = await deleteAccount(userId)
    }

    async function deleteAccount(id) {
        return fetch(`${Constant()}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({userId: id}),
        })
        .then(data => data.json())
        .catch((error) => {
            console.error('Fetch Error:', error);
        });
    }  

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ):
                (<div>
                    {showDeleteForm && (
                        <div className='popup'>
                            <div className='popupForm'>
                                <form>
                                    <label for="">Are you sure?</label>
                                    <br />
                                    <button
                                        className='btn'
                                        style={{ backgroundColor: 'green' }}
                                        onClick={onDelete}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type='submit'
                                        className='btn'
                                        style={{ backgroundColor: 'red' }}
                                        onClick={function () {
                                            setDeleteDisabled(false)
                                            setShowDeleteForm(false)
                                        }}
                                    >
                                        Cancel
                                    </button>

                                </form>
                            </div>                          
                        </div>
                    )}
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Open To Collaboration?: "
                                checked={user.isOpenToCollaboration}
                                onChange={(e) => setUser({ ...user, isOpenToCollaboration: e.currentTarget.checked })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Bio: 
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder=''
                                value={user.bio}
                                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                            />
                        </Form.Group>

                        <button
                            type='submit'
                            className='btn btn-block'
                            style={{ backgroundColor: 'green' }}
                            disabled={submitDisabled}
                        >
                            Save Changes
                        </button>
                    </Form>

                    <form onSubmit={onSubmitDelete}>
                        <button
                            type='submit'
                            className='btn'
                            style={{ backgroundColor: 'red' }}
                            disabled={deleteDisabled}
                        >
                            Delete Account
                        </button>
                    </form >                 
                    
                </div>)}
            
        </>
   )
}

export default UserManager