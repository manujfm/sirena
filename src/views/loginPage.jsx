import React, {Component, Fragment} from 'react';
import LoginComponent from "../components/LoginComponent"
import LoginManager from "../controlers/LoginManager";
import { setCurrentUser } from "../redux/actions/index"
import { connect } from "react-redux";
import PopUpComponent from "../components/PopUpComponent";


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            toast: false,
            errorMessage: ''
        };
        this.login = this.login.bind(this);
        this.handleToast = this.handleToast.bind(this)
    }

    handleToast(){
        this.setState( (prevState) => {
            return {toast: !prevState}
        })

    }

    async componentDidMount() {
        let isLogged = await LoginManager.isLogged();
        if (isLogged) {
            this.redirect()
        }
    }

    redirect() {
        window.location = "/Dashboard"
    }

    handleBadRequest(log){
        this.setState({
            toast: true,
            errorMessage: log.error,
            loading: false
        })
    }

    async login(payload){
        this.setState({loading: true });
        let login =  new LoginManager (payload.user, payload.password);
        let log = await login.login();
        if ( !log.ok ){
            this.handleBadRequest(log);
            return
        }

        this.props.setCurrentUser(log.userinfo);
        this.redirect();
        this.setState({loading: false});
    }


    render() {
        return (
            <Fragment>
                {this.state.toast && <PopUpComponent toast={this.state.toast} onClose={this.handleToast}  message={this.state.errorMessage} type={"error"}/>}
                <LoginComponent login={this.login} loading={this.state.loading}/>
            </Fragment>
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