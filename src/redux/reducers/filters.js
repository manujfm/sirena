import { type as setInitialFilters} from "../actions/setInitialFilters";
let defaultState = [];


const redu = function(state=defaultState, {type, payload}){
    switch (type) {
        case setInitialFilters :
            state = payload;
            return state;
        default:
            return state;
    }

};

export default redu;
