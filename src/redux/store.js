import { createStore, combineReducers } from 'redux'
import mail from './reducers/mail'
import user from './reducers/user'
import results from './reducers/results'
import filters from './reducers/filters'

const reducers = combineReducers({
    mail,
    user,
    results,
    filters
});

// const store = createStore(reducers);
/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducers, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

export default  store