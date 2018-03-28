exports.handler = (event, context, callback) => {
    console.log(event)
    var response = {
        "statusCode": 200,
        "headers": {},
        "body": JSON.stringify({ user: event.requestContext.authorizer.user, party: event.requestContext.authorizer.party }),
        "isBase64Encoded": false
    }
    console.log(response)
    callback(null, response)
}
