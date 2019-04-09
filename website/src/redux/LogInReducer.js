import {LOGGED_IN} from './ActionTypes'
const initialState = {
    isSuccess: false
}

export default function LogInReducer(state=initialState, action) {
    switch(action.type) {
        case LOGGED_IN:
            const {isSuccess} = action
            return {
                ...state,
                isSuccess
            }
        default:
            return state
    }
}