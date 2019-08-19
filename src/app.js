import axios from "axios";
import server from "./server.example"
import LoginManager from "./controlers/LoginManager";
let sirena = {};

let getHeaders = function (){
    let obj = {};
    obj["headers"] = {};
    obj["headers"]["Content-Type"] = 'application/json';
    let tok = LoginManager.getSessionID();
    if ( tok ) {
        obj["headers"]["Authorization"] = `Bearer ${tok}`
    }
    return obj
};



sirena.request = async function(type, endpoint, payload) {
    let url = `${server.host}:${server.port}/${endpoint}`;
    try {
        let res = await axios.request({
            method:type,
            url,
            data: payload,
            headers: getHeaders().headers
        });
        return res
    } catch (e) {
        return {ok:false, error:e}
    }
};




export default sirena