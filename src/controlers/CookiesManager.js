import Cookies from "universal-cookie";
const cookies = new Cookies();

class CookiesManager {

    static setCookie ( name, value, route, expire ) {
        cookies.set(name, value, { path: route, expires: expire })
    }

    static getCookie ( name ){
        let cook = cookies.get(name);
        return ( typeof  cook === "undefined" ) ? false : cook
    }


}

export default CookiesManager;