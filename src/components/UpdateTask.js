const UpdateTask = async (task) => {
    
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
        'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
    })

    const data = await res.json()

    return data
}

// const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(updTask),
//   })

//   const data = await res.json()


// const FetchTask = async (id) => {
//     const res = await fetch(`http://localhost:5000/tasks/${id}`)
//     const data = await res.json()
//     console.log("getting task")  
//     return data
// }

export default UpdateTask