import Constant from '../Constant'

const CategoryCrudOperations = {

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
    'postCategory': async (token, category) => {
        return await fetch(Constant() + `/api/Categories`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(data => data.json())
        .catch((error) => console.error('Fetch Error:', error))
    }

}

export default CategoryCrudOperations