import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LoadingComponent from './LoadingComponent';

const styles = {
    loginContainer: {
        marginTop: '10%'
    },
    card: {
        minWidth: 430
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

class LoginComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            passwordValue: '1234',
            emailValue: 'sirena@app.la',
            loading: false,
            error: null
        };
        this.setInputValueOnState = this.setInputValueOnState.bind(this);
        this.sendDataToParen = this.sendDataToParen.bind(this);
    }

    setInputValueOnState (event) {
        const name = event.target.id;
        const value = event.target.value;
        const obj = (name == 'email') ? { emailValue: value } : { passwordValue: value };
        this.setState(obj);
    }

    checkForm () {
        const res = true;
        const { passwordValue, emailValue } = this.state;
        const reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (emailValue === '') {
            this.setState((state) => {
                return { ...state, error: { message: 'Email can not be empty', input: LoginComponent.TYPE_INPUT_USERNAME } };
            });
            return false;
        }

        if (!reg.test(emailValue)) {
            this.setState((state) => {
                return { ...state, error: { message: 'Email is not a valid mail', input: LoginComponent.TYPE_INPUT_USERNAME } };
            });
            return false;
        }

        if (passwordValue === '') {
            this.setState((state) => {
                return { ...state, error: { message: 'Password can not be empty', input: LoginComponent.TYPE_INPUT_PASSWORD } };
            });
            return false;
        }
        return res;
    }

    sendDataToParen () {
        const res = this.checkForm();
        if (res) {
            const by = {
                password: this.state.passwordValue,
                user: this.state.emailValue
            };
            this.props.login(by);
        }
    }

    sendEnter (e) {
        const keyCode = e.keyCode;
        const enterKey = 13;
        if (keyCode == enterKey) {
            this.sendDataToParen();
        }
    }

    componentWillUnmount () {
        window.removeEventListener('keypress', (e) => { this.sendEnter(e) });
    }

    componentDidMount () {
        window.addEventListener('keypress', (e) => { this.sendEnter(e) });
    }

    render () {
        const { error } = this.state;
        return (
            <Grid container direction="column" justify="center" alignContent={'center'} alignItems={'center'} style={styles.loginContainer} >
                <Grid item xs={12} >
                    <Card style={styles.card} >
                        <CardContent>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={ error && error.input === LoginComponent.TYPE_INPUT_USERNAME }>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={this.state.emailValue}
                                        onChange={this.setInputValueOnState}
                                        margin="normal"
                                    />
                                    { error && error.input === LoginComponent.TYPE_INPUT_USERNAME && <FormHelperText id="component-error-text">{error.message}</FormHelperText> }

                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={error && error.input === LoginComponent.TYPE_INPUT_PASSWORD}>
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.passwordValue}
                                        onChange={this.setInputValueOnState}
                                        margin="normal"
                                    />
                                    { error && error.input === LoginComponent.TYPE_INPUT_PASSWORD && <FormHelperText id="component-error-text">{error.message}</FormHelperText> }
                                </FormControl>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container direction={'row-reverse'}>
                                <Grid item>
                                    <Button size="large" color="primary" onClick={this.sendDataToParen} disabled={this.props.loading}>
                                        Login
                                    </Button>
                                </Grid>

                                <LoadingComponent loading={this.props.loading} grid={8} />

                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

LoginComponent.TYPE_INPUT_USERNAME = 1;
LoginComponent.TYPE_INPUT_PASSWORD = 2;

export default LoginComponent;
