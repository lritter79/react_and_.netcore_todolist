import Constant from '../Constant'

const categoryCrudOperations = {

    'getCategoriesByUser': async (id, token) => {
        //console.log('getting user data')
        const res = await fetch(Constant() + `/api/users/${id}/Categories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        })
        const categories = await res.json()

        return categories
    },


}

export default categoryCrudOperations