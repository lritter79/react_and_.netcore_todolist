import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'
import userFunctions from './UserFunctions'

const UserManager = ({ handleLogout, token, id }) => {
    //console.log(`id: ${id}`)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState('')
    const [isChecked, setIsChecked] = useState()
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [deleteDisabled, setDeleteDisabled] = useState(false)
    

    //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(async () => {
        setIsLoading(false)
        const userData = await userFunctions.getUser(id, token)
        setUser(userData)

        
    }, [])

    useEffect(() => {
        return function cleanup() {
            console.log('clean up')
            setIsChecked(undefined)
        }
    }, [])

    useEffect(async () => {
        console.log('user use effect')
        if (isChecked != undefined) {
            const updatedUser = await userFunctions.saveUser({ user, id, token })        
        }
        else {
            console.log('first time')
        }
        console.log('set')
        setIsChecked(user?.isOpenToCollaboration)
    }, [user])

    useEffect(() => {
        console.log('isLoading use effect')
    }, [isLoading])

    

    async function onChange(e) {
        setIsLoading(true)  

        try {
            const value = e.target.checked
            setIsChecked(value)
            console.log(`val: ${value}`)
            console.log("inside of try block")
            console.log(user)
            await setUser(prev => { 
                return { ...prev, isOpenToCollaboration: value }
            })                  
        } catch (error) {
            console.log("failed to update user")
            console.log(error)
        }

        setIsLoading(false)
    }



    //async function toggleIsOpenToCollaboration(appUser) {
        
    //    return fetch(`${Constant()}/api/users/toggleCollab`, {
    //        method: 'PUT',
    //        headers: {
    //            'Authorization': 'Bearer ' + token,
    //            'Content-type': 'application/json',
    //        },
    //        body: JSON.stringify(appUser),
    //    })
    //        .then(data => data.json())
    //        .catch((error) => {
    //            console.error('Fetch Error:', error);
    //        });
    //}

    const onSubmit = async e => {
        e.preventDefault()
        setDeleteDisabled(true)
        setShowDeleteForm(true)
        //handleLogout(e)
        //let res = await deleteAccount(id)
    }

    const onDelete = async e => {
        e.preventDefault()
        handleLogout(e)
        let res = await deleteAccount(id)
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
                    
                    <form onSubmit={onSubmit}>
                        <button
                            type='submit'
                            className='btn'
                            style={{ backgroundColor: 'red' }}
                            isEnabled={deleteDisabled}
                        >
                        Delete Account
                        </button>
                    </form >                 
                    <form>
                        <input type="checkbox" checked={isChecked} onChange={onChange} />
                        <label>Open to collaboration?</label>
                    </form>
                </div>)}
            
        </>
   )
}

export default UserManager