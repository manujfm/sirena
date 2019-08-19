import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { connect } from 'react-redux'
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';


class SearchNavBarComponent extends Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.sendSaveEventToFather = this.sendSaveEventToFather.bind(this);
        this.sendSavedMailsEventToFather = this.sendSavedMailsEventToFather.bind(this)
    }

    onChange(event){
        this.props.onChange(event)
    }

    sendSaveEventToFather(e){
        this.props.saveSearch(e)
    }

    sendSavedMailsEventToFather(e){
        this.props.prevSearch(e)
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <div>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={ this.onChange }  />
                        <div>
                            <SaveIcon  onClick={this.sendSaveEventToFather}  />
                        </div>
                        <div>
                            <LibraryBooksIcon onClick={this.sendSavedMailsEventToFather} />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

        );
    }


}

export default SearchNavBarComponent;