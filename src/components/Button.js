import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

//use as <Button/>
export default Button
