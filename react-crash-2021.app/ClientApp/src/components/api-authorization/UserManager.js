import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Constant from '../Constant'

const UserManager = ({ handleLogout, token, id }) => {

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
            <form onSubmit={onSubmit}>
                <button
                    type='submit'
                    className='btn'
                    style={{ backgroundColor: 'red' }}
                >
                    Delete Account
                </button>
            </form>

            
        </>
   )
}

export default UserManager