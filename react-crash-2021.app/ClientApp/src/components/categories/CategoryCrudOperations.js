import Constant from '../Constant'

const CategoryCrudOperations = {

    'getCategoriesByUser': async (id, token) => {
        //console.log('getting user data')
        return await fetch(Constant() + `/api/Users/${id}/Categories`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch((error) => console.error('Fetch Error:', error))
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
    },
    'deleteCategory': async (token, catId) => {
        return await fetch(Constant() + `/api/Categories/${catId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch((error) => console.error('Fetch Error:', error))
    }

}

export default CategoryCrudOperations