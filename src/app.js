import axios from 'axios';
import server from './server.example';
import LoginManager from './controlers/LoginManager';
const sirena = {};

const getHeaders = function () {
    const obj = {};
    obj['headers'] = {};
    obj['headers']['Content-Type'] = 'application/json';
    const tok = LoginManager.getSessionID();
    if (tok) {
        obj['headers']['Authorization'] = `Bearer ${tok}`;
    }
    return obj;
};

sirena.getCurrentUser = function () {
    return LoginManager.getUserInfo();
};

sirena.request = async function (type, endpoint, payload = {}) {
    const url = `${server.host}:${server.port}/${endpoint}`;
    try {
        const res = await axios.request({
            method: type,
            url,
            data: payload,
            headers: getHeaders().headers
        });
        return res.data;
    } catch (e) {
        return { ok: false, error: e };
    }
};

export default sirena;
