import Constant from '../Constant'

const FetchTasks = async (id, token) => {
    const res = await fetch(Constant() + `/api/Users/${id}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await res.json()

    return data
}

export default FetchTasks
