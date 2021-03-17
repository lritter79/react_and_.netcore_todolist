import React, { useContext, useState } from 'react'
import checkIcon from '../../assets/check.svg';
import errorIcon from '../../assets/error.svg';
import infoIcon from '../../assets/info.svg';
import warningIcon from '../../assets/warning.svg';


const ToastListContext = React.createContext()
const ShowToastContext = React.createContext()

export function useToast() {
    return useContext(ToastListContext)
}

export function useShowToast() {
    return useContext(ShowToastContext)
}

export function ToastProvider({ children }) {
    const [list, setList] = useState([])

    const showToast = (type, text) => {
        let toastProperties = null
        const id = Math.floor((Math.random() * 100) + 1)
        //console.log('type: ' + type)
        switch (type) {
            case 'error':
                toastProperties = {
                    id,
                    title: 'Error!',
                    description: `${text}`,
                    backgroundColor: 'salmon',
                    icon: errorIcon
                }
                break
            case 'success':
                toastProperties = {
                    id,
                    title: 'Success!',
                    description: `${text}`,
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                break
            case 'info':
                toastProperties = {
                    id,
                    title: 'Info',
                    description: `${text}`,
                    backgroundColor: '#5bc0de',
                    icon: infoIcon
                }
                break

            default:
                setList([])
        }
        setList([...list, toastProperties])
    }
    //const testList = [
    //    {
    //        id: 1,
    //        title: 'Success',
    //        description: 'This is a success toast component',
    //        backgroundColor: '#5cb85c',
    //        icon: checkIcon
    //    },
    //    {
    //        id: 2,
    //        title: 'Danger',
    //        description: 'This is an error toast component',
    //        backgroundColor: '#d9534f',
    //        icon: errorIcon
    //    },
    //    {
    //        id: 3,
    //        title: 'Info',
    //        description: 'This is an info toast component',
    //        backgroundColor: '#5bc0de',
    //        icon: infoIcon
    //    },
    //    {
    //        id: 4,
    //        title: 'Warning',
    //        description: 'This is a warning toast component',
    //        backgroundColor: '#f0ad4e',
    //        icon: warningIcon
    //    }
    //]
    return (
        <ToastListContext.Provider value={list}>
            <ShowToastContext.Provider value={showToast}>
                {children}
            </ShowToastContext.Provider>
        </ToastListContext.Provider>
    )
}