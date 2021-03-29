import PropTypes from 'prop-types'

const Button = ({ color, text, onClick, isEnabled, textColor }) => {
  return (
    <button
          type='button'
          onClick={onClick}
          style={{ backgroundColor: color, color:textColor }}
          className='btn'
          disabled={isEnabled}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
  textColor: 'black'
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  textColor: PropTypes.string
}

//use as <Button/>
export default Button
