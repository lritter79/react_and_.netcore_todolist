import Constant from '../Constant'


const DeleteTask = async (id, token) => {

    await fetch(`${Constant()}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    //.filter removes the task with the same id as the id passed up
    
}

export default DeleteTask