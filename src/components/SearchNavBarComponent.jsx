import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';


class SearchNavBarComponent extends Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(event){
        this.props.onChange(event)
    }

    sendEnterEventToFather(e){
        this.props.finalSearch(e)
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", (e) => {this.sendEnterEventToFather(e)})
    }

    componentDidMount() {
        window.addEventListener("keypress", (e) => {this.sendEnterEventToFather(e)})
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
                    </div>
                </Toolbar>
            </AppBar>

        );
    }


}

export default SearchNavBarComponent;