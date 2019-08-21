export const type = 'setCurrentUser';
const setInitialMailState = function (object) {
    return {
        type,
        payload: object
    };
};

export default setInitialMailState;
