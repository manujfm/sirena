import React, {Component, Fragment} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import SaveIcon from '@material-ui/icons/Save'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'
import {TextField} from "@material-ui/core"
import {InputAdornment} from "@material-ui/core"
import Hidden from "@material-ui/core/Hidden";

const style = {
    icon: {
        marginTop: "35%",
        color:"grey",
        fontSize:"50px",
        display:"block"
    }
}



class SearchNavBarComponent extends Component {

    sendOpenDrawerEventToFather(event){
        this.props.openDrawer(event.target.value)
    }

    onChange(event){
        this.props.onChange(event.target.value)
    }

    sendSaveEventToFather(e){
        this.props.saveSearch(e)
    }

    sendSavedMailsEventToFather(e){
        this.props.prevSearch(e)
    }



    render() {
        return (
                <Grid container direction={"row"} style={{padding:"4%"}} >
                    <Grid item xs={2}>
                        <Hidden smUp implementation="css">
                            <MenuIcon style={style.icon} fontSize={"large"}  onClick={ (e) =>  { this.sendOpenDrawerEventToFather(e) }} />
                        </Hidden>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  margin="normal"
                                    variant={"outlined"}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) =>  { this.onChange(e) }} value={this.props.value}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                        />
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <SaveIcon style={style.icon} fontSize={"large"} onClick={ (e) =>  { this.sendSaveEventToFather(e) }}  />
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <LibraryBooksIcon style={style.icon} fontSize={"large"} onClick={ (e) => { this.sendSavedMailsEventToFather(e) }} />
                    </Grid>
                </Grid>

        );
    }


}

export default SearchNavBarComponent;