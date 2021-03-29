import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Constant from '../Constant'
import CrudOperations from '../task-crud-operations/CrudOperations'
import { useState, useEffect } from 'react'
import { useShowToast } from '../toast/ToastContext'
import { useToken } from '../api-authorization/UserContext'


const Calendar = () => {
    const [events, setEvents] = useState([])
    const { token } = useToken()
    const [isLoading, setIsLoading] = useState(true)
    const showToast = useShowToast() 

    function getTitleWithEmojis(task) {
        if (task?.isCompleted) return task.text + ' ✔️'
        //console.log(new Date())
        //console.log(new Date(task.day))
        //console.log(new Date(task.day) <= new Date())
        ////let x = new Date(`${task.day.GetFullYear()}-${task.day.GetMonth()}-${task.day.GetDay()}`);
        //console.log(x)

        if (!task?.isCompleted && (new Date(task.day) <= new Date())) return task.text + ' ❗'
           // && task.day >= new Date()
        else return task.text

    }

    useEffect(() => {
        //console.log('task tracker use effect')
        const getTasks = async () => {
            try {
                //console.log(CrudOperations)                               
                //console.log(`token = ${token}`)
                //console.log(`user = ${userId}`)
                if (token != undefined) {
                    const tasksFromServer = await CrudOperations.FetchTasks(token?.id, token?.token)
                    setIsLoading(false)
                    
                    setEvents(tasksFromServer.map(
                        (task) => ({
                            id: task.id, title: getTitleWithEmojis(task), borderColor: (task.reminder ? 'green' : ''), 
                            start: task.day, end: task.day,
                            extendedProps: {
                                completed: task.isCompleted,
                                dateCompleted: task.dateCompleted,
                                day: task.day
                            }
                        })
                    ))

                    console.log(tasksFromServer.map(
                        (task) => ({
                            id: task.id, title: getTitleWithEmojis(task), borderColor: (task.reminder ? 'green' : ''),
                            start: task.day, end: task.day,
                            extendedProps: {
                                completed: task.isCompleted,
                                dateCompleted: task.dateCompleted,
                                day: task.day
                            }
                        })
                    )
                    )
                }

            } catch (error) {
                showToast('error', error)
            }
        }

        getTasks()

        return function cleanup() {
            setEvents([])
        }
    }, [])


    return (
        <>
         {isLoading ? 
            (<h1>Loading</h1>) : 
            (<FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}
            />)}
        </>
        
    )
}

export default Calendar
