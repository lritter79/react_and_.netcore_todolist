const Constant = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'https://localhost:44310'
    }

    if (process.env.NODE_ENV === 'production') {
        return ''
    }
}

export default Constant