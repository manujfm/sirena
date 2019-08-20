import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { connect } from 'react-redux'
import InputBase from '@material-ui/core/InputBase';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



class SearchNavBarComponent extends Component {

    constructor(props){
        super(props);
        
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
                <Grid container direction={"row"} style={{padding:"4%"}}>
                    <Grid item xs={8}>
                        <SearchIcon />
                        <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={(e) =>  { this.onChange(e) }} value={this.props.value} />
                    </Grid>
                    <Grid item xs={1}>
                        <SaveIcon  fontSize={"large"} onClick={ (e) =>  {  this.sendSaveEventToFather(e)  }}  />
                    </Grid>
                    <Grid item xs={1}>
                        <LibraryBooksIcon fontSize={"large"} onClick={ (e) => { this.sendSavedMailsEventToFather(e) }} />
                    </Grid>
                </Grid>

        );
    }


}

export default SearchNavBarComponent;