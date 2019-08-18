import { type as setInitialMailStateType} from "../actions/setIntialMailState";
let defaultState = [];


const redu = function(state=defaultState, {type, payload}){
    switch (type) {
        case setInitialMailStateType :
            state = payload;
            return state;
        default:
            return state;
    }

};

export default redu;
