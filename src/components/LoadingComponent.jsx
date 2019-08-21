import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import '../css/index.css';

class LoadingComponent extends Component {
    render () {
        const style = {
            marginTop: '90px'
        };
        style['display'] = (this.props.loading) ? 'block' : 'none';
        return (
            <Grid item xs={this.props.grid} style={style}>
                <LinearProgress variant={'query'} className={'loading'}/>
            </Grid>
        );
    }
}

export default LoadingComponent;
