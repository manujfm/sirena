import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class MailFormDialogComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            subject: '',
            message: ''
        };
        this.setInputValueOnState = this.setInputValueOnState.bind(this);
        this.sendSaveEvent = this.sendSaveEvent.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    sendSaveEvent () {
        this.props.save(this.state);
    }

    handleClose (e) {
        this.props.onClose(e);
    }

    setInputValueOnState (event) {
        const name = event.target.id;
        const value = event.target.value;
        const ob = {};
        ob[name] = value;
        this.setState(ob);
    }

    render () {
        return (
            <Dialog
                open
                className={'containerFilter'}
                fullWidth
                // TransitionComponent={this.getTransitionComponent()}
                onClose={ this.handleClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    New Mail
                </DialogTitle>
                <DialogContent >
                    <Grid container direction={'column'}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth >
                                <TextField
                                    id="firstName"
                                    label="Username"
                                    name="firstName"
                                    onChange={this.setInputValueOnState}
                                    margin="normal"
                                    value={this.state.username}
                                />
                                {/* { error && error.input === LoginComponent.TYPE_INPUT_PASSWORD && <FormHelperText id="component-error-text">{error.message}</FormHelperText> } */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth >
                                <TextField
                                    id="lastName"
                                    label="Lastname"
                                    name="lastName"
                                    onChange={this.setInputValueOnState}
                                    margin="normal"
                                    value={this.state.lastname}
                                />
                                {/* { error && error.input === LoginComponent.TYPE_INPUT_PASSWORD && <FormHelperText id="component-error-text">{error.message}</FormHelperText> } */}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth >
                                <TextField
                                    id="subject"
                                    label="Subject"
                                    name="subject"
                                    onChange={this.setInputValueOnState}
                                    margin="normal"
                                    value={this.state.subject}
                                />
                                {/* { error && error.input === LoginComponent.TYPE_INPUT_PASSWORD && <FormHelperText id="component-error-text">{error.message}</FormHelperText> } */}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth >
                                <TextField
                                    id="message"
                                    label="Message"
                                    name="message"
                                    multiline
                                    rows="4"
                                    onChange={this.setInputValueOnState}
                                    margin="normal"
                                    value={this.state.message}
                                />
                                {/* { error && error.input === LoginComponent.TYPE_INPUT_PASSWORD && <FormHelperText id="component-error-text">{error.message}</FormHelperText> } */}
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.sendSaveEvent} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

export default MailFormDialogComponent;
