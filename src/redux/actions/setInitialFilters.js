export const type = "setInitialFilters";
const setInitialFilters = function (array) {
    return {
        type,
        payload: array
    }
};


export default setInitialFilters