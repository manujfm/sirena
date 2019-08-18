import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from "@material-ui/core/Typography"

class LeftSideMenuComponent extends Component {


    render() {
        return (
            <Drawer  variant="permanent" anchor="left">
                <div />
                <Typography>Hi, {this.props.userName}</Typography>
                <Divider />
                <List>
                    {['Inbox', 'Drafts', 'Send email'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>

        );
    }


}

export default LeftSideMenuComponent;