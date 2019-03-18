import {LogInApi} from 'src/ajax'
import {LOGGED_IN} from './ActionTypes'

export function userLogin(req) {
    return async (dispatch) => {
        try{
            const {data} = await LogInApi.handleLogIn(req)
                dispatch({
                    type: LOGGED_IN,
                    isSuccess: data.isSuccess
                })
            return data
        } catch(err) {
            console.log(err)
        }
    }
}