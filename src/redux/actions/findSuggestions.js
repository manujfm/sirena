export const type = "findSuggestions";
const findSuggestions = function ( text) {
    return {
        type,
        payload: text
    }
};


export default findSuggestions