const Constant = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'https://localhost:44310'
    }

    if (process.env.NODE_ENV === 'production') {
        return 'http://reacttodoapp.com:8003'
    }
}

export default Constant