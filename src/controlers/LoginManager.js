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

    setLoggedUser(info){
        this.setInfoUser(info);
        this.setSessionID(info)
    }

    setInfoUser(info){
        const expDate = moment().add(1, "h").format();
        const usData = JSON.stringify({firsname:info.name.firstname, lastname:info.name.lastname});
        CookiesManager.setCookie(this.__login_name_us, usData, "/", new Date(expDate))
    }

    setSessionID(info){
        const expDate = moment().add(1, "h").format();
        CookiesManager.setCookie(this.__login_name_to, info.token, "/", new Date(expDate))
    }

    static async isLogged(){
        let payload =  await sirena.request("get","api/verifySessionID" );
        if ( payload.data ) {
            return payload.data.ok
        }
        return false
    }

    static getSessionID(){
        return CookiesManager.getCookie("SESSION_ID")
    }

    static getUserInfo(){
        return CookiesManager.getCookie("SESSION_NAME")
    }

    async login(){
        let payload =  await sirena.request("post","api/login", {username: this.user, password:this.password} );
        if ( payload.data ) {
            let {data: loginInfo} = payload;
            if ( loginInfo.ok ){
                this.setLoggedUser(loginInfo);
                return {ok: true, userinfo: loginInfo.name }
            }
        }
        return {ok:false, "error": "cant log"}
    }


    logout(){

    }

}

export default LoginManager