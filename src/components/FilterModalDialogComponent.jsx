import React, {Component, Fragment} from 'react';

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Slide from "@material-ui/core/Slide"
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SearchIcon from '@material-ui/icons/Search';

import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// const theme = useTheme();
// const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


class FilterModalDialogComponent extends Component {

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.clickSearch = this.clickSearch.bind(this)
    }


    getTransitionComponent(){
        return React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
    }


    handleClose() {
        this.props.onClose()
    }

    clickSearch(e, filter){
        this.props.onFilterClick(filter);
        this.handleClose()
    }

    _renderFilters(){
        return this.props.filters.map( (filter, key) => {
            return (
                <div key={key} id={key + "-" + filter.filter} >
                    <ListItem alignItems="flex-start" >
                        <ListItemText primary={
                            <Fragment>
                                <SearchIcon onClick={ (e) => { this.clickSearch(e, filter.filter) } }/>
                            </Fragment>
                        } />
                        <ListItemText primary={"Busqueda: " + filter.filter} secondary={
                            <React.Fragment>
                                <Typography component="span" variant="body2" color="textPrimary">
                                    {"Cantidad de Mails encontrados: " + filter.mailsid.split(",").length}
                                </Typography>
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider component="li"/>
                </div>
            )
        })
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={this.getTransitionComponent()}
                onClose={ this.handleClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"FILTROS"}</DialogTitle>
                <DialogContent>
                    {this._renderFilters()}
                </DialogContent>
            </Dialog>

        );
    }


}

export default FilterModalDialogComponent;