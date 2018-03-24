exports.handler = (event, context, callback) => {
    const data = JSON.stringify(event.userData)
    callback(null, data)
}