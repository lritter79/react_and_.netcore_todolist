//instructions https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import Constant from '../Constant'

const userFunctions = {

    'getUser': async (id, token) => {
        //console.log('getting user data')
        const res = await fetch(Constant() + `/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        })
        const user = await res.json()
        console.log(user)
        return user
    },

    'saveUser': async (credentials) => {
        
        //console.log("saving user")
        //console.log(credentials.user)
        const response = await fetch(`${Constant()}/api/users/${credentials.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + credentials.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials.user),
        })

        const r = await response.json()
        if (r.error) {
            console.log(r.error)
        }
        else {
            return r.user
        }

    }
}

export default userFunctions