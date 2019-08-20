import React, { Component, Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


class MailBoxComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            limit: 20
        };
        this.raiseLimit = this.raiseLimit.bind(this)
    }

    raiseLimit(){
        this.setState( (prevState) => {
            return prevState.limit += 10
        })
    }


    __renderMails(){
        let { mails } =  this.props;
        return mails.slice(0, this.state.limit).map((mail, key) => {
            return (
                <Fragment key={key}>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={mail.Subject} secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" color="textPrimary">
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
            <Fragment>
                {this.__renderMails()}
                <Button onClick={this.raiseLimit}>Show More...</Button>
            </Fragment>
        );
    }


}

export default MailBoxComponent;