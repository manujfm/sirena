import React, { Component, Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Mail from '../models/Mail'

class MailBoxComponent extends Component {

    __renderItem(){
        let { mails } =  this.props;
        return mails.map( (mail) => {
            mail = new Mail(mail);
            return (
                <Fragment>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={mail.Subject}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {mail.getFullNameUser()}
                                    </Typography>
                                     { " - " + mail.Message}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                </Fragment>
            )
        })
    }


    render() {
        return (
            <div>
                {this.__renderItem()}
            </div>
        );
    }


}

export default MailBoxComponent;