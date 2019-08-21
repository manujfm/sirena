import React, {Component, Fragment} from 'react';

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Slide from "@material-ui/core/Slide"
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SearchIcon from '@material-ui/icons/Search';

import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class FilterModalDialogComponent extends Component {

    getTransitionComponent(){
        return React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
    }


    handleClose() {
        this.props.onClose()
    }

    clickSearch (e, filter) {
        this.props.onFilterClick(filter)
        this.handleClose()
    }

    _renderFilters(){
        return this.props.filters.map((filter, key) => {
            return (
                <Grid item xs={12} key={key} id={key + "-" + filter.filter} >
                    <ListItem button alignItems="flex-start" onClick={ (e) => { this.clickSearch(e, filter.filter) } } >
                        <ListItemText primary={
                            <Fragment>
                                <SearchIcon />
                            </Fragment>
                        } />
                        <ListItemText primary={
                                            <Fragment>
                                                <Typography component="span" variant="h5" color="textPrimary">
                                                    {"Search: " + filter.filter}
                                                </Typography>
                                            </Fragment>
                                    }


                                      secondary={
                                            <Fragment>
                                                <Typography component="span" variant="h6" color="textPrimary">
                                                    {"Found Mails: " + filter.mailsid.split(",").length}
                                                </Typography>
                                            </Fragment>
                                        }
                        />
                    </ListItem>
                    <Divider component="li"/>
                </Grid>
            )
        })
    }

    render () {
        return (
            <Dialog
                className={"containerFilter"}
                fullWidth
                open={this.props.open}
                TransitionComponent={this.getTransitionComponent()}
                onClose={ (e) => { this.handleClose(e) } }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Filters"}</DialogTitle>
                <DialogContent >
                    <Grid container direction={"column"}>
                        <List component="nav" aria-label="main mailbox folders">
                            {this._renderFilters()}
                        </List>
                    </Grid>
                </DialogContent>
            </Dialog>

        );
    }


}

export default FilterModalDialogComponent;