import Constant from './Constant'

const FetchTask = async (id) => {
    const res = await fetch(`${Constant()}/api/tasks/${id}`)
    const data = await res.json()
    return data
}

export default FetchTask