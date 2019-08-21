import Cookies from 'universal-cookie';
import server from '../server.example';
const cookies = new Cookies();

class CookiesManager {
    static setCookie (name, value, route, expire) {
        cookies.set(name, value, { path: route, expires: expire });
    }

    static getExpCookieHours () {
        return server['expire-cookie-hours'];
    }

    static getCookie (name) {
        const cook = cookies.get(name);
        return (typeof cook === 'undefined') ? false : cook;
    }
}

export default CookiesManager;
