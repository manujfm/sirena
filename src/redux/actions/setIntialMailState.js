export const type = 'setInitialMailState';
const setInitialMailState = function (array) {
    return {
        type,
        payload: array
    };
};

export default setInitialMailState;
