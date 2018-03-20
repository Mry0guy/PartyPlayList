export const initialstate = { host: false, que: [], SEARCH_RESULTS: [], pageQue: null }

export default function rootReducer(state = initialstate, action) {
    let newQue = []
    let id = 0
    console.log(action.type)
    switch (action.type) {
        case 'CONNECTION_OK':
            console.log('socket connected')
            return state
        case 'SEARCH_RESULTS':
            return Object.assign({}, state, { SEARCH_RESULTS: action.payload })
        case 'ADD_SONG':
            newQue = state.que
            newQue.concat(action.payload)
            return (Object.assign({}, state, { que: newQue }))
        case 'SONG_VOTE':
            id = action.payload.song
            newQue = state.que
            newQue.array.forEach(element => {
                if (element.id === id) {
                    element += action.payload.vote ? -1 : 1
                }
            });
            return (Object.assign({}, state, { que: newQue }))
        case 'REMOVE_SONG':
            id = action.payload.id
            newQue = state.que
            newQue.array.forEach(element => {
                if (element.id === id) {
                    newQue.splice(newQue.indexOf(element), 1)
                }
            });
            return (Object.assign({}, state, { que: newQue }))
        case 'SPOTIFY_LOGIN':
            hotPage = action.payload
            return (Object.apply({}, state, { pageQue: hotPage }))
        default:
            return state
    }
}
