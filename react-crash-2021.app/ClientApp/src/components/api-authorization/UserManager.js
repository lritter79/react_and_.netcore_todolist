import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'
import userFunctions from './UserFunctions'

const UserManager = ({ handleLogout, token, id }) => {
    //console.log(`id: ${id}`)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState()
    const [isChecked, setIsChecked] = useState('')
    

    //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(async () => {
        setIsLoading(false)
        const userData = await userFunctions.getUser(id, token)
        setUser(userData)
    }, [])

    useEffect(async () => {
        console.log('user use effect')
        console.log(isChecked)
        if (isChecked != undefined) {
            const updatedUser = await userFunctions.saveUser({ user, id, token })        
        }
        else {
            console.log('first time')
        }                      
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
            setUser(prev => { 
                return { ...prev, isOpenToCollaboration: value }
            })
            
            
            

        } catch (error) {
            console.log("failed to update user")
            console.log(error)
        }
        console.log("out of try block")
        console.log(user)
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
                (<>
                    <form onSubmit={onSubmit}>
                        <button
                            type = 'submit'
                            className = 'btn'
                            style = {{ backgroundColor: 'red' }}
                        >
                        Delete Account
                        </button>
                    </form >                 
                    <form>
                        <input type="checkbox" checked={isChecked} onChange={onChange} />
                        <label>Open to collaboration?</label>
                    </form>
                </>)}
            
        </>
   )
}

export default UserManager