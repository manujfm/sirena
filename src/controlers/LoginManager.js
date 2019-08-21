import sirena from "../app"
import CookiesManager from "./CookiesManager";
import moment from "moment"

class LoginManager {

    constructor(user, password){
        this.__login_name_to = "SESSION_ID";
        this.__login_name_us = "SESSION_NAME";
        this.user = user;
        this.password = password
    }

    setLoggedUser(token, info){
        this.setInfoUser(info);
        this.setSessionID(token)
    }

    setInfoUser(info){
        const expDate = moment().add(1, "h").format();
        const usData = JSON.stringify(info);
        CookiesManager.setCookie(this.__login_name_us, usData, "/", new Date(expDate))
    }

    setSessionID(token){
        const expDate = moment().add(1, "h").format();
        CookiesManager.setCookie(this.__login_name_to, token, "/", new Date(expDate))
    }

    static async isLogged(){
        let payload =  await sirena.request("get","api/verifySessionID" );
        if ( payload ) {
            return payload.ok
        }
        return false
    }

    static getSessionID(){
        return CookiesManager.getCookie("SESSION_ID")
    }

    static getUserInfo(){
        let info = CookiesManager.getCookie("SESSION_NAME")
        return ( info ) ? info : {}
    }


    async login(){
        let payload =  await sirena.request("post","api/login", {username: this.user, password:this.password} );
        if ( payload ) {
            let loginInfo = payload;
            if ( loginInfo.ok ){
                this.setLoggedUser(loginInfo.token, loginInfo.userInfo);
                return {ok: true, userinfo: loginInfo.userInfo }
            }
        }
        return {ok: false, "error": "Upps!! We are experimenting with a server error, try later"}
    }


    logout(){

    }

}

export default LoginManager