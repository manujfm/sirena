import data from "../data"

class Mail {

    constructor (props){
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
        let mails = [];
        for ( let mail of data ){
            mails.push(new Mail(mail))
        }
        return mails
    }

    static getSearchOptions(){
        return {
            keys: [{
                name: 'Message',
                weight: 0.3
            }, {
                name: 'Subject',
                weight: 0.7
            }]
        }
    }

}

export default Mail