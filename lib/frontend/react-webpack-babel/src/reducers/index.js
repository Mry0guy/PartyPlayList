export const initialstate = { host: false, que: que[] }

export default function rootReducer(state = initialstate, action) {
    switch (action.type) {
        case 'CONNECTION_OK':
            return { text: 'subscribed!' }
        default:
            return state
    }
}
