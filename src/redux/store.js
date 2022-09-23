import { legacy_createStore as createStore, combineReducers } from 'redux'
import { collapsedReducer } from './reducers/collapsedReducer'
import { loadingReducer } from './reducers/loadingReducer'

const reducer = combineReducers({
    collapsedReducer,
    loadingReducer
})

const store = createStore(reducer)

export default store