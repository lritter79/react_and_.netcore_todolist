import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'

const UserManager = ({ handleLogout, token, id }) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    

    //https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {
        console.log('empty use effect')
        const init = async () => {
            
            const user = await getUserData(id, token)
            setIsLoading(false)
            //console.log(user.isOpenToCollaboration)
        }
                
        init()
        
    }, [])

    useEffect(() => {
        console.log('user use effect')
        console.log(user)
        
    }, [user])

    useEffect(() => {
        console.log('isLoading use effect')
    }, [isLoading])

    async function getUserData(id, token) {
        console.log('getting user data')
        const response = await fetch(`${Constant()}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json',
            }
        })
        const user = await response.json()

        const set = await setUser(user)

        return set

    }

    async function onChange(e) {
        try {
            const val = e.target.checked
            console.log('cb va; = ' + val)     
            const updateUserState = await  setUser(prevState => {
                return { ...prevState, isOpenToCollaboration: val }
            });
            
            const updated = await toggleIsOpenToCollaboration({ ...user, isOpenToCollaboration: val })
            
        } catch (error) {
            console.log("failed to update user")
            console.log(error)
        }
    }



    async function toggleIsOpenToCollaboration(appUser) {
        
        return fetch(`${Constant()}/api/users/toggleCollab`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(appUser),
        })
            .then(data => data.json())
            .catch((error) => {
                console.error('Fetch Error:', error);
            });
    }

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
                        <input type="checkbox" checked={user?.isOpenToCollaboration} onChange={onChange} />
                        <label>Open to collaboration?</label>
                    </form>
                </>)}
            
        </>
   )
}

export default UserManager