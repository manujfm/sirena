import Record from './Record';
import sirena from '../app';
/**
 * @author Manuel Marcano
 * @class Filter
 */

class Filter extends Record {
    constructor (props) {
        super(props);
        this.filter = props.filter;
        this.mailsid = props.mailsid;
        this.userid = props.userid;
        this.username = props.username;
    }

    /**
     * @description Salva el filtro en el servidor
     * @return {Object}
     **/
    async save () {
        let res = super.save();
        if (!res) return res;
        res = await sirena.request('post', 'api/saveFilter', this);
        if (!res.ok) return { ok: false, error: 'Upps!! We are experimenting with a server error, try later' };
        return res;
    }

    /**
     * @description Obtiene todos los filtros
     * @return {Array}
     **/
    static async getFilters () {
        const currentUser = sirena.getCurrentUser();
        const data = await sirena.request('post', 'api/getFilters', { userid: currentUser.id });
        if (data.hasOwnProperty('ok') && !data.ok) return [];
        const filters = [];
        if (data.length > 0) {
            for (const filter of data) {
                filters.push(new Filter(filter));
            }
        }
        return filters;
    }
}

export default Filter;
