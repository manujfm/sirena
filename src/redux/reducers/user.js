import {type as setCurrentUser} from "../actions/setCurrentUser"
const defaultState = "";
const redu = function(state=defaultState, {type, payload}){
    switch (type) {
        case setCurrentUser:
            return Object.assign({}, state, payload);
        default:
            return state;
    }

};

export default redu;
