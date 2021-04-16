import Button from './Button'
import Constant from './Constant'
import { useState, useRef, useEffect } from 'react'

const Downloader = ({ task, token }) => {
    const hiddenDownloadLink = useRef()
    //const [isEnabled, setIsEnabled] = useState(false)
    const [onClick, setOnClick] = useState(null)

    useEffect(() => {
        if (task.day) {
            //setIsEnabled(true)
            setOnClick(() => exportTaskToiCal)
        }
        else {
            setOnClick(() => noDay)
        }
    },
    [])

    const noDay = () => { alert("This task needs a date before it can be exported to iCal") }

    const exportTaskToiCal = async () => {
        try {
            const res = await fetch(`${Constant()}/api/tasks/ExportTaskToiCal`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token?.token
                },
                body: JSON.stringify(task)
            })
            const data = await res.blob()
            const url = window.URL.createObjectURL(data);
            //console.log(data)
            hiddenDownloadLink.current.href = url
            hiddenDownloadLink.current.setAttribute('download', `${task.text}.ics`)
            hiddenDownloadLink.current.click()
            hiddenDownloadLink.current.href = ''
            hiddenDownloadLink.current.setAttribute('download', '')
            //return data

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button text='Export To iCal' color='#6f00ff' onClick={onClick} />
            <a ref={hiddenDownloadLink}></a>
        </>
    )
}

export default Downloader