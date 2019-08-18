import { createStore, combineReducers } from 'redux'
import mail from './reducers/mail'
import userName from './reducers/userName'
import results from './reducers/results'

const reducers = combineReducers({
    mail,
    userName,
    results
});

const store = createStore(reducers);

export default  store