var jwt = require('jsonwebtoken')

function generatePolicy(principalId, effect, resource, context) {
	return {
		'principalId': principalId,
		'policyDocument': {
			'Version': '2012-10-17',
			'Statement': [{
				'Action': 'execute-api:Invoke',
				'Effect': effect,
				'Resource': resource
			}],
		},
		context
	}
}

exports.handler = (event, context, callback) => {
	const token = event.authorizationToken.split(' ')[1]
	jwt.verify(token, 'lowkeysecret', (err, authdata) => {
		var policy
		if (err) {
			console.log(err)
			policy = generatePolicy('user', 'Deny', event.methodArn, "*")
		} else {
			console.log(authdata.user)
			const context = {
				"user": authdata.user,
				"party": authdata.party
			}
			policy = generatePolicy('user', 'Allow', event.methodArn, context)
		}
		console.log(policy)
		context.done(null, policy)
	})
}
