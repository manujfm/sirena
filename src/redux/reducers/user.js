import {type as setCurrentUser} from "../actions/setCurrentUser"
import LoginManager from "../../controlers/LoginManager"
const defaultState = LoginManager.getUserInfo();
const redu = function(state=defaultState, {type, payload}){
    switch (type) {
        case setCurrentUser:
            return Object.assign({}, state, payload);
        default:
            return state;
    }

};

export default redu;
