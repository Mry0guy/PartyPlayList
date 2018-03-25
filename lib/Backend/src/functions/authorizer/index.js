function generatePolicy(principalId, effect, resource, authdata) {
	return {
		'principalId': principalId,
		'policyDocument': {
			'Version': '2012-10-17',
			'Statement': [{
				'Action': 'execute-api:Invoke',
				'Effect': effect,
				'Resource': resource
			}]
		},
		"context": {
			"authdata": authdata
		}
	}
}

exports.handler = (event, context, callback) => {
	var jwt = require('jsonwebtoken')
	const token = event.authorizationToken.split(' ')[1]
	console.log(token)
	jwt.verify(token, 'lowkeysecret', (err, authdata) => {
		var policy
		if (err) {
			console.log(err)
			policy = generatePolicy('user', 'Deny', event.methodArn, "")
		} else {
			console.log('allow')
			policy = generatePolicy('user', 'Allow', event.methodArn, JSON.stringify(authdata))
		}
		context.done(null, policy)
	})
}
