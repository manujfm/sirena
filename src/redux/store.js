import { createStore, combineReducers } from 'redux'
import mail from './reducers/mail'
import userName from './reducers/userName'
import suggestions from './reducers/suggestions'
import results from './reducers/results'

const reducers = combineReducers({
    mail,
    userName,
    suggestions,
    results
});

const store = createStore(reducers);

export default  store