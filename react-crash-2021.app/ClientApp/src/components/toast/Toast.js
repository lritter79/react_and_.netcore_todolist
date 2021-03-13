import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useToast } from './ToastContext'

import './Toast.css';
//source:     transition: max-height 0.5s, opacity 0.5s;
const Toast = ({ position, autoDelete, dismissTime }) => {
    const toastList = useToast()
    const [list, setList] = useState(toastList)

    //function sleep(ms) {
    //    console.log('sleeping')
    //    return new Promise(resolve => setTimeout(resolve, ms));
    //  }

    useEffect(() => {
        console.log('toastlist side effect')
        console.log(toastList)
        setList([...toastList]);

        // eslint-disable-next-line
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (autoDelete && toastList.length && list.length) {            
                deleteToast(toastList[0].id);
            }
        }, dismissTime);

        return async () => {                     
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime, list]);

    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) =>
                        <div
                            key={i}
                            className={`notification toast ${('hidden' in toast) ? ('hidden') : ('show')} ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )

    Toast.defaultProps = {
        position: 'bottom-right'
    }

    Toast.propTypes = {
        toastList: PropTypes.array.isRequired,
        position: PropTypes.string,
        autoDelete: PropTypes.bool,
        autoDeleteTime: PropTypes.number
    }
}

export default Toast

