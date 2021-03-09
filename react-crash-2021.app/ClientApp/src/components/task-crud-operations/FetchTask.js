import Constant from '../Constant'

const FetchTask = async (id, token) => {

    const res = await fetch(`${Constant()}/api/tasks/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await res.json()
    return data
}

export default FetchTask