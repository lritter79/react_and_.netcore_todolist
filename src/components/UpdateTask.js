const UpdateTask = (id, task) => {
    console.log('update task')
    fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })
}

export default UpdateTask