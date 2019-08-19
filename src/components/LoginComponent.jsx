import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';


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
            loading: false,
            errorMessage: ""
        };
        this.setInputValueOnState = this.setInputValueOnState.bind(this);
        this.sendDataToParen = this.sendDataToParen.bind(this);
    }

    setInputValueOnState(event){
        let name = event.target.id;
        let value = event.target.value;
        let obj = ( name == "user") ? {userValue : value} : {passwordValue : value};
        this.setState(obj)
    }

    checkEmptyForm(){
        let res = true;
        let {passwordValue, userValue} = this.state;

        if ( userValue === "" ) {
            this.setState({errorMessage: "User Empty"})
            res = false
        }

        if ( passwordValue === "" ){
            this.setState({errorMessage: "User Empty"})
            res = false
        }
        return res
    }


    sendDataToParen(){
        let res = this.checkEmptyForm();
        if ( res ){
            let by = {
                password: this.state.passwordValue,
                user: this.state.userValue
            };
            this.props.login(by)
        }
    }

    sendEnter(e){
        let keyCode = e.keyCode;
        let enterKey = 13;
        if( keyCode == enterKey ) {
            this.sendDataToParen()
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
                           <Container>
                               <Grid item>
                                   <Button size="small" color="primary" onClick={this.sendDataToParen} disabled={this.props.loading}>
                                       Share
                                   </Button>
                               </Grid>

                               { this.props.loading && <Grid item>
                                                           <LinearProgress color="secondary"  />
                                                       </Grid>
                               }
                           </Container>

                       </CardActions>
                   </Card>
               </Grid>
           </Container>

        );
    }


}

export default LoginComponent;