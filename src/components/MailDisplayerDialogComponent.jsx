import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

class MailDisplayerDialogComponent extends Component {
    getTransitionComponent () {
        return React.forwardRef(function Transition (props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
    }

    handleClose () {
        this.props.onClose();
    }

    render () {
        const { mail } = this.props;
        return (
            <Dialog
                open
                className={'containerFilter'}
                fullWidth
                TransitionComponent={this.getTransitionComponent()}
                onClose={ (e) => { this.handleClose(e) } }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Grid container direction={'row'}>
                        <Grid item xs={12} md={2}>
                            <Avatar style={{ margin: 10, width: 60, height: 60 }}>{ mail.getFullNameUser()[0]} </Avatar>
                        </Grid>
                        <Grid item xs={12} md={10} style={{ paddingTop: '5%' }}>
                            <Typography variant={'h4'}>{ mail.getFullNameUser() }</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent >
                    <Typography variant={'h5'}>{mail.Subject}</Typography>
                    <Typography variant={'body2'}>{mail.Message}</Typography>
                </DialogContent>
            </Dialog>

        );
    }
}

export default MailDisplayerDialogComponent;
