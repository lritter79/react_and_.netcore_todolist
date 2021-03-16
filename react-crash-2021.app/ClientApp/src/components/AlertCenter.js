import Table from 'react-bootstrap/Table'
import { FaTimes } from 'react-icons/fa'
import FormatDateString from './FormatDateString'
import Constant from './Constant'

const AlertCenter = ({ alerts, setAlerts }) => {

    const deleteTask = async (id) => {
        await fetch(`${Constant()}/api/alerts/${id}`, {
            method: 'DELETE',
        })
        //.filter removes the task with the same id as the id passed up
        setAlerts(alerts.filter((alert) => alert.id !== id))
    }

    return (
        <>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th colSpan='2'>Message</th>                      
                    </tr>
                </thead>
                <tbody>
                    {alerts.map((alert, index) =>
                    (<tr>
                        <td>{FormatDateString(alert.date)}</td>
                        <td>{alert.message}</td>
                        <td>
                            <FaTimes
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => deleteTask(alert.id)}
                            />
                        </td>
                    </tr>)
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default AlertCenter