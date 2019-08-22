import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

class MailBoxComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            limit: 20
        };
        this.raiseLimit = this.raiseLimit.bind(this);
    }

    raiseLimit () {
        this.setState((prevState) => {
            return prevState.limit += 10;
        });
    }

    sendMailIdToParent (e, id) {
        this.props.selectedMail(e, id);
    }

    __getMailsListComponent () {
        const { mails } = this.props;
        return mails.slice(0, this.state.limit).map((mail, key) => {
            return (
                <Fragment key={key}>
                    <ListItem button alignItems="flex-start" onClick={ (e) => { this.sendMailIdToParent(e, mail.id) } }>
                        <ListItemText primary={mail.subject} secondary={
                            <Fragment>
                                <Typography component="span" variant="body2" color="textPrimary">
                                    {mail.getFullNameUser()}
                                </Typography>
                                { ' - ' + mail.message}
                            </Fragment>
                        }
                        />
                    </ListItem>
                    <Divider component="li" />
                </Fragment>
            );
        });
    }

    __renderMails () {
        return (
            <Fragment>
                <List>
                    { this.__getMailsListComponent() }
                </List>
                <Button onClick={this.raiseLimit}>Show More...</Button>
            </Fragment>

        );
    }

    render () {
        const { mails } = this.props;
        return (
            <Fragment>
                { mails.length > 0 && this.__renderMails()}
                { mails.length <= 0 &&
                <Grid container alignContent={'center'} >
                    <Grid item xs={8} >
                        <Typography variant={'h4'} >No results found...</Typography>
                    </Grid>
                </Grid>
                }

            </Fragment>
        );
    }
}

export default MailBoxComponent;
