export const initialstate = { text: 'not yet' }

export default function rootReducer(state = initialstate, action) {
    switch (action.type) {
        case 'CONNECTION_OK':
            return { text: 'subscribed!' }
        default:
            return state
    }
}
