var jwt = require('jsonwebtoken')

function generatePolicy(principalId, effect, resource) {
  	return {
    	'principalId': principalId,
    	'policyDocument': {
      		'Version': '2012-10-17',
      		'Statement': [{
        		'Action': 'execute-api:Invoke',
        		'Effect': effect,
        		'Resource': resource
      		}]
    	}
  	}
}

exports.handler = (event, context, callback) => {
    jwt.verify(event.token, 'lowkeysecret', (err, authdata) => {
        if(err) {
            callback(null, generatePolicy('user', 'Deny', event.methodArn))
        } else {
            callback(null, generatePolicy('user', 'Alow', event.methodArn))
        }
    })
}