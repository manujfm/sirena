import {type as filterMails} from "../actions/filterMails";
import Mail from "../../models/Mail";
import Fuse from "fuse.js";

const searchMails = function(mails, text){
    if ( !text ) return mails;
    let fuse = new Fuse(mails, Mail.getSearchOptions());
    return fuse.search(text)
};

const defaultState = [];

const redu = function(state=defaultState, action){
    switch (action.type) {
        case filterMails:
            console.log("ACCCC", action)
            return searchMails(action.mails, action.payload)
        default:
            return state;
    }

};

export default redu;
