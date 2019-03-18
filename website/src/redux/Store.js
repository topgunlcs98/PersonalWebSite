import { createStore, applyMiddleware } from 'redux'
import Reducer from './Reducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

export default createStore(
  Reducer,
  composeEnhancers(applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ))
)
