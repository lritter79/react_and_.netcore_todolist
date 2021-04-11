import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useToken} from '../api-authorization/UserContext'
import Constant from '../Constant'
import { useShowToast } from '../toast/ToastContext'
import CoolColor from './CoolColor'


const Calendar = ({tasks, setTasks}) => {

    //function f() = {
    //    
    //}
    const [events, setEvents] = useState([])
    const [isEditable, setIsEditable] = useState(true)
    let history = useHistory()
    const { token } = useToken()
    const showToast = useShowToast()
    //const initialView = useCallback(() => {}, [])

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

    function filterAndMap(arr) {
        const result = arr.filter(task => !task?.date)
        return result.map(
            (task) => ({
                id: task.id, title: getTitleWithEmojis(task), borderColor: CoolColor(task.id), backgroundColor: CoolColor(task.id),
                start: task.day, end: task.day,
                extendedProps: {
                    completed: task.isCompleted,
                    dateCompleted: task.dateCompleted,
                    day: task.day
                }
            })
        )
    }

    useEffect(() => {
        
        setEvents(filterAndMap(tasks))

        return function cleanup() {
            setEvents([])
        }
    }, [])

    useEffect(() => {
        
        setEvents(filterAndMap(tasks))


    }, [tasks])

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
        //console.log(args.event.start)
        //console.log(args.event.id)
        //console.log(token)
        let date = new Date(args.event.start).toISOString()
        
        //console.log(date)
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


    const onWindowResize = (arg) => {
        //console.log(arg.view.calendar);
        if (window.innerWidth > 375 ) {
            arg.view.calendar.changeView('dayGridMonth')
        }
        else {
            arg.view.calendar.changeView('listWeek')
        }
    }

    return (
        <> 
            <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
                    eventClick={handleEventClick}
                    initialView={window.innerWidth > 375 ?  'dayGridMonth' : 'listWeek'}
                    editable={isEditable}
                    eventDrop={handleEventDrop}
                    events={events}
                    handleWindowResize={true}
                    windowResize={onWindowResize}
                />         
        </>
        
    )
}

export default Calendar
