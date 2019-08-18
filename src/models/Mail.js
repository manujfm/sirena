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

}

export default Mail