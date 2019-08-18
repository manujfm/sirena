import { type as findSuggestionsType } from '../actions/findSuggestions'
const defaultState = [];

const redu = function(state=defaultState, {type, payload}){
    switch (type) {
        case findSuggestionsType:
            return [{a:1,b:2,c:3}];
        default:
            return state;
    }

};

export default redu;
