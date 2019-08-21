export const type = 'filterMails';
const filterMails = function (mails, text) {
    return {
        type,
        payload: text,
        mails: mails
    };
};

export default filterMails;
