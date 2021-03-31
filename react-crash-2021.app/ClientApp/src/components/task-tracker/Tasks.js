import Task from './Task'
import { useState, useRef, useCallback, useEffect } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import CoolColor from './CoolColor'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//.map() takes in  a function
const Tasks = ({ tasks, onDelete, onToggle, onGoToDetail }) => {
    const [showCompleted, setShowCompleted] = useState(true)
    //whether or not there are more tasks to render
    const [hasMore, setHasMore] = useState(true)
    //the way inifitinte scroll works is it will query the rest of the tasks and append them
    //to the list of tasks to show
    const [pageNumber, setPageNumber] = useState(1)
    //the giets set by the callback of last task ref
    const observer = useRef()
    //node is the element with lastTaskRef as the ref
    const lastTaskRef = useCallback(node => {
        console.log(node)
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            //check if has more is true so we dont paginate forever
            if (entries[0].isIntersecting && hasMore) {
                console.log('visible')
                setPageNumber(prev => prev + 1)
            }
        })
        if(node) observer.current.observe(node)
    }, [hasMore, pageNumber])

    useEffect(() => {
        if (showCompleted) {
            if (tasks.filter(t => !t.isCompleted).length < pageNumber * 5) setHasMore(false)
        }
        else {
            if (tasks.length < pageNumber * 5) setHasMore(false)
        }
        
    }, [pageNumber])

  function toggleShowCompleted(e) {
    e.currentTarget.blur()
    setShowCompleted(!showCompleted)  
  }

  const getSlicedTasks = () => {
      let arr = showCompleted ? tasks.slice(0, (pageNumber * 5)) : tasks.filter(t => !t.isCompleted).slice(0, (pageNumber * 5))
      return arr
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
            <ReactCSSTransitionGroup transitionName="example">
                {getSlicedTasks().map((task, index) => {
                    return (getSlicedTasks().length === index + 1) ? 
                        (<div key={task.id} ref={lastTaskRef}>
                            <Task 
                                key={index} 
                                task={task} 
                                onDelete={onDelete}
                                coolColor={CoolColor(index)} 
                                onToggle={onToggle} 
                                onGoToDetail={onGoToDetail}                                
                            />
                        </div>) : 
                        (<div key={task.id}>
                            <Task 
                                key={index} 
                                task={task} 
                                onDelete={onDelete}
                                coolColor={CoolColor(index)} 
                                onToggle={onToggle} 
                                onGoToDetail={onGoToDetail} 
                            />
                        </div>)                                       
                    })
                }
            </ReactCSSTransitionGroup>                              
        </>
  )
}

export default Tasks
