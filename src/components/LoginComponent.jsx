import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class LoginComponent extends Component {

    constructor (props){
        super(props);
        this.state = {
            passwordValue: "",
            userValue: "",
            errorRequest: { ok: false, errorCode: ""},
            loading: false,
            messageLoading: "Send"
        };
        this.setInputValueOnState = this.setInputValueOnState.bind(this);
        window.ADS = this
    }

    setInputValueOnState(event){
        let name = event.target.id;
        let value = event.target.value;
        let obj = ( name == "user") ? {userValue : value} : {passwordValue : value};
        this.setState(obj)
    }

    checkEmptyForm(){
        let {passwordValue, userValue} = this.state;
        if (userValue === ""){
            return false
        }
        if (passwordValue === ""){
            return false
        }
        return true
    }

    setErrorRequest(error){
        let orgState = {};
        Object.assign(orgState, this.state);
        orgState.errorRequest.ok = true;
        orgState.errorRequest.errorCode = error;
        this.setState(orgState)
    }

    sendRequestLogin(){
        this.setState({loading: true, messageLoading: ""});
        // let body = new Login(this.state.userValue, this.state.passwordValue);
        let res = this.checkEmptyForm();
        if ( !res ){
            this.setState({loading: false, messageLoading: "Send"});
            return;
        }
        // //Promise
        // LM.loginRequest(body).then( (resolved) => {
        //     if ( resolved.ok ){
        //         window.location = "/ContentManager/Storybox";
        //         return
        //     }
        //     this.setErrorRequest(resolved.error);
        //     this.setState({loading: false, messageLoading: "Send"})
        // })
    }

    sendEnter(e){
        let keyCode = e.keyCode;
        let enterKey = 13;
        if(keyCode == enterKey){
            this.sendRequestLogin()
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", (e) => {this.sendEnter(e)})
    }

    componentDidMount() {
        window.addEventListener("keypress", (e) => {this.sendEnter(e)})
    }

    render() {
        // const classes = useStyles();
        return (
           <Container direction="column"  justify="center" >
               <Grid item xs={6} >
                   <Card >
                       <CardContent>
                            <Grid item xs={12}>
                                <TextField
                                    id="user"
                                    name="user"
                                    label="Username"
                                    value={this.state.userValue}
                                    onChange={this.setInputValueOnState}
                                    margin="normal"
                                />
                            </Grid>
                           <Grid item xs={12}>
                               <TextField
                                   id="password"
                                   label="Password"
                                   type="password"
                                   name="password"
                                   value={this.state.passwordValue}
                                   onChange={this.setInputValueOnState}
                                   margin="normal"
                               />
                           </Grid>
                       </CardContent>
                       <CardActions>
                           <Button size="small" color="primary">
                               Share
                           </Button>
                       </CardActions>
                   </Card>
               </Grid>
           </Container>

        );
    }


}

export default LoginComponent;