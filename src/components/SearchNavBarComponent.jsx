import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Autosuggest from 'react-autosuggest';
import findSuggestions from '../redux/actions/findSuggestions'

class SearchNavBarComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            value:""
        }
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.__renderSuggestion = this.__renderSuggestion.bind(this);
        window.AASSSSSSSSSSSSS= this
    }

    onSuggestionsFetchRequested(){

    }

    onSuggestionsClearRequested(){

    }

    onChange(){

    }

    __renderSuggestion(sugges){
        console.log("SSSSSS", sugges)
    }

    render() {
        let {value} = this.state;
        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange
        };
        return (
            <AppBar position="static">
                {/*<Toolbar>*/}
                {/*    <div>*/}
                {/*        <div>*/}
                {/*            <SearchIcon />*/}
                {/*        </div>*/}
                {/*        <Autosuggest*/}
                {/*            suggestions={suggestions}*/}
                {/*            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}*/}
                {/*            onSuggestionsClearRequested={this.onSuggestionsClearRequested}*/}
                {/*            renderSuggestion={this.__renderSuggestion}*/}
                {/*            inputProps={inputProps}*/}
                {/*            renderSuggestionsContainer={options => (*/}
                {/*                <Paper {...options.containerProps} square>*/}
                {/*                    {options.children}*/}
                {/*                </Paper>*/}
                {/*            )}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</Toolbar>*/}
            </AppBar>

        );
    }


}
const mapStateToProps = ( state ) => {
    return {
        mail: state.mail,
        suggestions: state.suggestions
    }
};

const mapDispatchToProps = {
    findSuggestions
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchNavBarComponent);