import sirena from '../app';
import CookiesManager from './CookiesManager';
import moment from 'moment';

/**
 * @author Manuel Marcano
 * @class LoginManager
 * @description Controlador que maneja lo relacionado al login del usuario
 */
class LoginManager {
    constructor (user, password) {
        this.__login_name_to = 'SESSION_ID';
        this.__login_name_us = 'SESSION_NAME';
        this.user = user;
        this.password = password;
    }
    /**
     * @author Manuel Marcano
     * @description guarda la informacion del usuario en las cookies
     * @param token {String} token de acceso
     * @param info {Object} informacion del usuario
     */
    setLoggedUser (token, info) {
        this.setInfoUser(info);
        this.setSessionID(token);
    }

    setInfoUser (info) {
        const expDate = moment().add(CookiesManager.getExpCookieHours(), 'h').format();
        const usData = JSON.stringify(info);
        CookiesManager.setCookie(this.__login_name_us, usData, '/', new Date(expDate));
    }

    setSessionID (token) {
        const expDate = moment().add(1, 'h').format();
        CookiesManager.setCookie(this.__login_name_to, token, '/', new Date(expDate));
    }
    /**
     * @author Manuel Marcano
     * @description verifica si la sesion del usuario expiro
     */
    static async isLogged () {
        const payload = await sirena.request('get', 'api/verifySessionID');
        if (payload) {
            return payload.ok;
        }
        return false;
    }

    static getSessionID () {
        return CookiesManager.getCookie('SESSION_ID');
    }

    /**
     * @author Manuel Marcano
     * @description obtiene la informacion de usuario logeado
     */
    static getUserInfo () {
        const info = CookiesManager.getCookie('SESSION_NAME');
        return (info) || {};
    }

    /**
     * @author Manuel Marcano
     * @description hace el login del usuario con un request al servidor
     */
    async login () {
        const payload = await sirena.request('post', 'api/login', { username: this.user, password: this.password });
        let err = "UPPS !!! Server ERROR"
        if (payload) {
            const loginInfo = payload;
            if (loginInfo.ok) {
                this.setLoggedUser(loginInfo.token, loginInfo.userInfo);
                return { ok: true, userinfo: loginInfo.userInfo };
            }
            err = loginInfo.error
        }
        return { ok: false, error: err };
    }

    logout () {

    }
}

export default LoginManager;
