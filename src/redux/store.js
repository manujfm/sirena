import { createStore, combineReducers } from 'redux'
import mail from './reducers/mail'
import user from './reducers/user'
import results from './reducers/results'

const reducers = combineReducers({
    mail,
    user,
    results
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default  store