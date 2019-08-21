import Record from './Record';
import sirena from '../app';
/**
 * @author Manuel Marcano
 * @class Mail
 */

class Mail extends Record {
    constructor (props) {
        super(props);
        this.Message = props.message;
        this.id = props.id;
        this.Subject = (props.hasOwnProperty('subject')) ? props.subject : '-';
        this.UserName = props.firstName;
        this.UserLastName = props.lastName;
    }

    getFullNameUser () {
        return `${this.UserLastName}, ${this.UserName}`;
    }

    /**
     * @description Obtiene todos los mails
     * @return {Array}
     **/

    static async getMails () {
        const data = await sirena.request('get', 'api/getMails');
        if (data.hasOwnProperty('ok') && !data.ok) return [];
        const mails = [];
        for (const mail of data) {
            mails.push(new Mail(mail));
        }
        return mails;
    }

    /**
     * @description Obtiene las opciines de busqueda de mails por ponderacion
     * Mas informacion: https://www.npmjs.com/package/fuse
     * @return {Object}
     **/

    static getSearchOptions () {
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
        };
    }
}

export default Mail;
