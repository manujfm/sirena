import Record from './Record';
import sirena from '../app';

class Filter extends Record {
    constructor (props) {
        super(props);
        this.filter = props.filter;
        this.mailsid = props.mailsid;
        this.userid = props.userid;
        this.username = props.username;
    }

    async save () {
        let res = super.save();
        if (!res) return res;
        res = await sirena.request('post', 'api/saveFilter', this);
        if (!res.ok) return { ok: false, error: 'Upps!! We are experimenting with a server error, try later' };
        return res;
    }

    static async getFilters () {
        const currentUser = sirena.getCurrentUser();
        const data = await sirena.request('post', 'api/getFilters', { userid: currentUser.id });
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
