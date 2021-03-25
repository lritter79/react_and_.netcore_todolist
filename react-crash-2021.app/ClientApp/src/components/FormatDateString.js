const FormatDateString = (date) => {
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let dt = date.getDate()


    return year + '-' + month + '-' + dt + ' at ' + date.toLocaleTimeString('en-US')
}

export default FormatDateString