import React, { Component, Fragment } from 'react';
import LoginComponent from '../components/LoginComponent';
import LoginManager from '../controlers/LoginManager';
import PopUpComponent from '../components/PopUpComponent';
import { setCurrentUser } from '../redux/actions/index';
import { connect } from 'react-redux';
/**
 * @author Manuel Marcano
 * @class LoginPage
 */
class LoginPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            toast: false,
            errorMessage: ''
        };
        this.login = this.login.bind(this);
        this.handleToast = this.handleToast.bind(this);
    }

    handleToast () {
        this.setState((prevState) => {
            return { toast: !prevState };
        });
    }

    async componentDidMount () {
        const isLogged = await LoginManager.isLogged();
        if (isLogged) {
            this.redirect();
        }
    }

    redirect () {
        window.location = '/Dashboard';
    }

    /**
     * @description Maneja las request que no tuvieron exito, y lanza un popUp
     * @param log {object}
     **/
    handleBadRequest (log) {
        this.setState({
            toast: true,
            errorMessage: log.error,
            loading: false
        });
    }

    /**
     * @description Ejecuta el login de usuario
     * @param payload {object} contiene el usuario y la contraseña
     **/
    async login (payload) {
        this.setState({ loading: true });
        const login = new LoginManager(payload.user, payload.password);
        const log = await login.login();
        if (!log.ok) {
            this.handleBadRequest(log);
            return;
        }

        this.props.setCurrentUser(log.userinfo);
        this.redirect();
        this.setState({ loading: false });
    }

    render () {
        return (
            <Fragment>
                {this.state.toast && <PopUpComponent toast={this.state.toast} onClose={this.handleToast} message={this.state.errorMessage} type={'error'}/>}
                <LoginComponent login={this.login} loading={this.state.loading}/>
            </Fragment>
        );
    }
}

/* Redux Logic */
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};
const mapDispatchToProps = {
    setCurrentUser
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
