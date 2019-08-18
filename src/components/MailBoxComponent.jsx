import React, { Component, Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Mail from '../models/Mail'

class MailBoxComponent extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }


    __renderMails(){
        let { mails } =  this.props;
        return mails.map( (mail, key) => {
            return (
                <Fragment key={key}>
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
                {this.__renderMails()}
            </div>
        );
    }


}

export default MailBoxComponent;