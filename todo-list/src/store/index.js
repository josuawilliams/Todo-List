import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import TodoReducer from './reducers/TodoReducers'
import thunk from 'redux-thunk'



let store = createStore(TodoReducer, applyMiddleware(thunk))
export default store