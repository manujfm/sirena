import { type as filterMails } from '../actions/filterMails';
import Mail from '../../models/Mail';
import Fuse from 'fuse.js';

const searchMails = function (mails, text) {
    if (!text) return mails;
    const fuse = new Fuse(mails, Mail.getSearchOptions());
    return fuse.search(text);
};

const defaultState = [];

const redu = function (state = defaultState, action) {
    switch (action.type) {
    case filterMails:
        return searchMails(action.mails, action.payload);
    default:
        return state;
    }
};

export default redu;
