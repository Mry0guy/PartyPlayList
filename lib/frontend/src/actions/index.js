const actions = {
    SERVICE_LOGIN: (user, party) => {
        if (user === null || party === null) {
            return { type: 'SERVICE_LOGIN', payload: { user: user, party: party } }
        } else {
            return { type: 'SERVICE_LOGIN', payload: { user: 'guest', party: 'null' } }
        }
    },

    TOKEN_RECIVED: (token) => { return { type: 'TOKEN_RECIVED', payload: { token: token } } },

    ERROR: (description) => { return { type: 'ERROR', payload: { description: description } } },

    CONNECTION_OK: () => { return { rype: 'CONNECTION_OK', payload: {} } },



}

export default actions
