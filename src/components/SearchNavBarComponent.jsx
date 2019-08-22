import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import Add from '@material-ui/icons/Add';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { TextField, InputAdornment } from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
const style = {
    buttonIcon: {
        color: 'grey',
        display: 'block'
    },
    icon: {
        marginTop: '8%',
        fontSize: '50px'

    }
};

class SearchNavBarComponent extends Component {
    sendOpenDrawerEventToFather (event) {
        this.props.openDrawer(event.target.value);
    }

    onChange (event) {
        this.props.onChange(event.target.value);
    }

    sendSaveEventToFather (e) {
        this.props.saveSearch(e);
    }

    sendSavedMailsEventToFather (e) {
        this.props.prevSearch(e);
    }

    sendOpenMailForm (e) {
        this.props.openMailForm(e);
    }

    render () {
        return (
            <Grid container direction={'row'} style={{ padding: '4%' }} >
                <Box display={{ xs: 'block', md: 'none' }}>

                    <Grid item xs={2}>
                        <Hidden smUp implementation="css">
                            <IconButton style={style.buttonIcon} onClick={ (e) => { this.sendOpenDrawerEventToFather(e) }}>
                                <MenuIcon style={style.icon} fontSize={'large'} />
                            </IconButton>
                        </Hidden>
                    </Grid>
                </Box>
                <Grid item xs={5} md={8}>
                    <TextField margin="normal"
                        fullWidth
                        variant={'outlined'}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => { this.onChange(e) }} value={this.props.value}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={2} md={1}>
                    <Tooltip title="Save Filter" placement="left">
                        <div>
                            <IconButton disabled={this.props.disableButtons} style={style.buttonIcon} onClick={ (e) => { this.sendSaveEventToFather(e) }}>
                                <SaveIcon style={style.icon} fontSize={'large'} />
                            </IconButton>
                        </div>
                    </Tooltip>

                </Grid>
                <Grid item xs={2} md={1}>
                    <Tooltip title="See previous filters" placement="left">
                        <div>
                            <IconButton disabled={this.props.disableButtons} style={style.buttonIcon} onClick={ (e) => { this.sendSavedMailsEventToFather(e) }} >
                                <LibraryBooksIcon style={style.icon} fontSize={'large'}/>
                            </IconButton>
                        </div>
                    </Tooltip>
                </Grid>

                <Grid item xs={12} md={1}>
                    <Tooltip title="New Mail" placement="left">
                        <div>
                            <IconButton disabled={this.props.disableButtons} style={style.buttonIcon} onClick={ (e) => { this.sendOpenMailForm(e) }} >
                                <Add style={style.icon} fontSize={'large'}/>
                            </IconButton>
                        </div>
                    </Tooltip>
                </Grid>
            </Grid>

        );
    }
}

export default SearchNavBarComponent;
