import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useToken} from '../api-authorization/UserContext'
import Constant from '../Constant'
import { useShowToast } from '../toast/ToastContext'

const Calendar = ({tasks, setTasks}) => {
    const [events, setEvents] = useState([])
    const [isEditable, setIsEditable] = useState(true)
    let history = useHistory()
    const { token } = useToken()
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

        setEvents(tasks.map(
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

        return function cleanup() {
            setEvents([])
        }
    }, [])

    //const handleDateClick = (arg) => { // bind with an arrow function
    //    alert(arg.dateStr)        
    //}

    const handleEventClick = (arg) => {
        //console.log(arg.event.id)
        history.push(`/task/${arg.event.id}`)
    }

    const handleEventDrop = async (args) => {
        setIsEditable(false)
        //console.log(args)
        console.log(args.event.start)
        //console.log(args.event.id)
        //console.log(token)
        let date = new Date(args.event.start).toISOString()
        
        console.log(date)
        try {
            const res = await fetch(`${Constant()}/api/tasks/${args.event.id}/UpdateTaskDate?date=${date}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token?.token
                }
            })
        
            const data = await res.json()
            
            setIsEditable(true)

            setTasks(
                tasks.map((task) =>
                    task.id === data.id ? data : task
                )
            )
        }
        catch (error) {
            showToast('error', 'error')
        }        
    }

    return (
        <>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                eventClick={handleEventClick}
                initialView="dayGridMonth"
                editable={isEditable}
                eventDrop={handleEventDrop}
                events={events}
            />
        </>
        
    )
}

export default Calendar
