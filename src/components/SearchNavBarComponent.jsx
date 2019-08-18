import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';


class SearchNavBarComponent extends Component {


    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <div>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>

        );
    }


}

export default SearchNavBarComponent;