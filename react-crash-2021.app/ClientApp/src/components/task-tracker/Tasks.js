import Task from './Task'
import { useState, useRef, useCallback, useEffect } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
//import CoolColor from './CoolColor'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//.map() takes in  a function
const Tasks = ({ tasks, onDelete, onToggle, onGoToDetail, categories }) => {
    const [showCompleted, setShowCompleted] = useState(true)
    //whether or not there are more tasks to render
    const [hasMore, setHasMore] = useState(true)
    //the way inifitinte scroll works is it will query the rest of the tasks and append them
    //to the list of tasks to show
    const [pageNumber, setPageNumber] = useState(1)
    //the gets set by the callback of last task ref
    const observer = useRef()
    //node is the element with lastTaskRef as the ref
    const lastTaskRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        //gist is it finds if the node is in the view of the window
        observer.current = new IntersectionObserver(entries => {
            //check if has more is true so we dont paginate forever
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1)
            }
        })
        if(node) observer.current.observe(node)
    }, [hasMore, pageNumber])

    useEffect(() => {
        //console.log('tasks has rendered')
    }, [])

    useEffect(() => {
        if (!showCompleted) {
            if (tasks.filter(t => !t.isCompleted).length <= pageNumber * 5) setHasMore(false)
            else setHasMore(true)
        }
        else {

            if (tasks.length <= pageNumber * 5) setHasMore(false)
            else setHasMore(true)
        }

    }, [pageNumber, tasks, showCompleted])

  function toggleShowCompleted(e) {
    e.currentTarget.blur()
    setShowCompleted(!showCompleted)  
  }

    const getSlicedTasks = () => {
      let arr = showCompleted ? tasks.slice(0, (pageNumber * 5)) : tasks.filter(t => !t.isCompleted).slice(0, (pageNumber * 5))

        let tasksToDisplay = arr.map((task, index) => {
            return (arr.length === index + 1) ?
                (<div key={task.id} ref={lastTaskRef}>
                    <Task
                        key={index}
                        task={task}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onGoToDetail={onGoToDetail}
                    />
                </div>) :
                (<div key={task.id}>
                    <Task
                        key={index}
                        task={task}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onGoToDetail={onGoToDetail}
                    />
                </div>)
        })

        return tasksToDisplay
    }
      
    return (
        <>
            <label>
                <Toggle
                    id='toggleShowCompleted'
                    defaultChecked={showCompleted}
                    onChange={toggleShowCompleted}
                />
                <span>Show Completed Tasks?</span>
            </label>                
            <>
                {getSlicedTasks()}
            </>                              
        </>
  )
}

export default Tasks
