import axios from 'axios';
import server from './server.example';
import LoginManager from './controlers/LoginManager';
const sirena = {};
/**
 * @author Manuel Marcano
 * @description Es un modulo helper, que centraliza funcionalidades para que puedan estar disponibles en todo el proyecto
 */
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

/**
 * @author Manuel Marcano
 * @description Maneja la parte de request hacia el servidor
 * @param type {string} tipo de peticion (post, get)
 * @param endpoint {string} ruta al cual se hara la peticion "/request"
 * @param endpoint {object} el body si es una  peticion post
 */

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
