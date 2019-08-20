import Record from "./Record"
import sirena from "../app";

class Filter extends Record {

    constructor (props){
        super(props);
        this.filter = props.filter;
        this.mailsid = props.mailsid;
        this.userid = props.userid;
        this.username = props.username;
    }

    async save() {
        let res = super.save();
        if ( !res ) return res;
        return sirena.request("post", "api/saveFilter", this)
    }

    static async getFilters(){
        let data = await sirena.request("get", "api/getFilters");
        let filters = [];
        if ( data.length > 0 )
        for ( let filter of data ){
            filters.push(new Filter(filter))
        }
        return filters
    }

}

export default Filter