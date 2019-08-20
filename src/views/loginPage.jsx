import React, {Component} from 'react';
import LoginComponent from "../components/LoginComponent"
import LoginManager from "../controlers/LoginManager";
import setCurrentUser from "../redux/actions/setCurrentUser";
import {connect} from "react-redux";


class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false
        };
        this.login = this.login.bind(this)
    }

    async componentDidMount() {
        let isLogged  = await LoginManager.isLogged();
        if (isLogged){
            this.redirect()
        }
    }

    redirect(){
        window.location = "/Dashboard"
    }

    async login(payload){
        this.setState({isLoading: true });
        let login =  new LoginManager (payload.user, payload.password);
        let log = await login.login();
        if ( log ) {
            this.props.setCurrentUser(log.userinfo);
            this.redirect()
        }
        this.setState({isLoading: false});
    }


    render() {
        return (
            <div>
                <LoginComponent login={this.login} loading={this.state.isLoading}/>
            </div>
        );
    }


}

const mapStateToProps = ( state ) => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = {
    setCurrentUser
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);