import Record from './Record';
import sirena from '../app';
/**
 * @author Manuel Marcano
 * @class Mail
 */

class Mail extends Record {
    constructor (props) {
        super(props);
        this.message = props.message;
        this.id = props.id;
        this.subject = (props.hasOwnProperty('subject')) ? props.subject : '-';
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.type = props.type || Mail.TYPE_RECEIVED;
    }

    getFullNameUser () {
        return `${this.lastName}, ${this.firstName}`;
    }

    /**
     * @description Salva el Mail en el servidor
     * @return {Object}
     **/
    async save () {
        let res = super.save();
        if (!res) return res;
        res = await sirena.request('post', 'api/saveMails', [this]);
        if (!res.ok) return { ok: false, error: 'Upps!! We are experimenting with a server error, try later' };
        return res;
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
                    name: 'message',
                    weight: 0.4
                },
                {
                    name: 'subject',
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

Mail.TYPE_RECEIVED = 1;
Mail.TYPE_SENT = 2;
export default Mail;
