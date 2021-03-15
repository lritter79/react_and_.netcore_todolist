import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from '../Button'

//takes in props as parameters
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  //use header a parent elements

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

//default props incase they dont get passed in
Header.defaultProps = {
  title: 'Task Tracker',
}

//sets title to be a string and to be required
Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header
