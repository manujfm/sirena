import React, {Component, Fragment} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';


const classes = {
    drawerContainer: {
        margin:"4%",
        height: "40%"
    },
    bigAvatar:{
        margin: 10,
        width: 60,
        height: 60,
    },
    drawer: {
    }
};

const menu = {

}

class LeftSideMenuComponent extends Component {

    __renderDrawerContent(){
        return (
                <Grid container direction={"column"} alignContent={"center"} alignItems={"center"} style={classes.drawerContainer}>
                    <Grid item >
                        <Avatar style={classes.bigAvatar}>{this.props.userName[0]} </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>Hola, {this.props.userName}</Typography>
                    </Grid>
                    <Grid item>
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={"Inbox"} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon> <MailIcon/> </ListItemIcon>
                                <ListItemText primary={"Mail"} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon> <SendIcon/> </ListItemIcon>
                                <ListItemText primary={"Sent"} />
                            </ListItem>

                    </List>
                    </Grid>

                    <Divider />
                </Grid>

        )

    }


    render() {
        return (
            <Fragment>
                <Hidden smUp implementation="css">
                    <Drawer  variant="temporary" anchor="left">
                        { this.__renderDrawerContent() }
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer containerstyle={{height: 'calc(100% - 80px)', top: 64}} variant="permanent" anchor="left">
                        { this.__renderDrawerContent() }
                    </Drawer>
                </Hidden>

            </Fragment>

        );
    }


}

export default LeftSideMenuComponent;