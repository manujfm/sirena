import React, { Component, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const classes = {
    drawerContainer: {
        borderRight: '1px solid #E6E6E6',
        height: '100%'
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60
    }

};

class LeftSideMenuComponent extends Component {
    openSentMails () {
        this.props.onOpenSent();
    }

    __renderDrawerContent () {
        return (
            <Grid container direction={'column'} alignContent={'center'} alignItems={'center'} style={classes.drawerContainer}>
                <Avatar style={classes.bigAvatar}>{this.props.userName[0]} </Avatar>

                <Typography variant="h6" gutterBottom>Hi, {this.props.userName}</Typography>

                <Divider />
                <List>
                    <ListItem button selected={!this.props.changeSeleted} onClick={ () => { this.openSentMails() }}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Inbox (${this.props.mails.length})`} />
                    </ListItem>
                    <ListItem button selected={this.props.changeSeleted} onClick={ () => { this.openSentMails() }}>
                        <ListItemIcon>
                            <SendIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Sent (${this.props.sentMails.length})`} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Mail'} />
                    </ListItem>

                </List>
                <Divider />

            </Grid>

        );
    }

    handleDrawerClose (e) {
        this.props.onClose(e);
    }

    render () {
        return (
            <Fragment>
                <Drawer variant="temporary" open={this.props.open} anchor="left">
                    <IconButton onClick={ (e) => { this.handleDrawerClose(e) } }>
                        <ChevronLeftIcon />
                    </IconButton>
                    { this.__renderDrawerContent() }
                </Drawer>
                <Hidden xsDown implementation="css">
                    { this.__renderDrawerContent() }
                </Hidden>

            </Fragment>

        );
    }
}

export default LeftSideMenuComponent;
