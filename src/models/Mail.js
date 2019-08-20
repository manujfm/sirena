import Record from "./Record";
import sirena from "../app";

class Mail extends Record {

    constructor(props){
        super(props);
        this.Message = props.message;
        this.id = props.id;
        this.Subject = ( props.hasOwnProperty("subject") ) ? props.subject : "-";
        this.UserName = props.firstName;
        this.UserLastName = props.lastName;
    }

    getFullNameUser() {
        return `${this.UserLastName}, ${this.UserName}`
    }

    static async getMails(){
        let data = await sirena.request("get", "api/getMails");
        let mails = [];
        for ( let mail of data ){
            mails.push(new Mail(mail))
        }
        return mails
    }

    static getSearchOptions(){
        return {
            keys: [
                {
                    name: 'Message',
                    weight: 0.4
                },
                {
                    name: 'Subject',
                    weight: 0.4
                }
                // {
                //     name: 'UserName',
                //     weight: 0.1
                // },
                // {
                //     name: 'UserLastName',
                //     weight: 0.1
                // },

            ]
        }
    }

}

export default Mail