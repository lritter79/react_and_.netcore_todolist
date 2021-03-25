import Constant from '../Constant'

const CreateTask = async (task, authToken) => {

    console.log(authToken)
    return fetch(Constant() + '/api/tasks', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(task)
    })
        .then(data => data.json())
        .catch((error) => {
            console.error('Fetch Error:', error);
        })
}


export default CreateTask