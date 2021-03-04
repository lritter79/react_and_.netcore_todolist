import { Route } from 'react-router-dom'

const LoggedInView = (userId) => {

    return (
        <>
            <Route
                path='/tasks'
                exact
                render={(props) =>
                    <>
                        <AddTask onAdd={addTask} isToggled={showAddTask} />
                        {!isLoading ? (
                            (tasks.length > 0) ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                    onGoToDetail={() => { setShowAddTask(false) }}
                                />) :
                                ('No Tasks To Show')
                        ) : ('Loading ...')}
                        <Route path={'/task/:id'} exact
                            render={(props) => (
                                <TaskDetails
                                    onUpdate={updateTask}
                                />
                            )}
                        />

                    </>


                }
            />
        </>       
        )
    
}