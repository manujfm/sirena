import React, {Component, Fragment} from 'react';
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import LeftSideMenuComponent from "../components/LeftSideMenuComponent"
import SearchNavBarComponent from "../components/SearchNavBarComponent"
import MailBoxComponent from "../components/MailBoxComponent"
import data from "../data"

class Dashboard extends Component {


    render() {
        return (
            <Fragment>
                <Container direction="row" spacing={0}>
                    <Grid  item xs={2}>
                        <LeftSideMenuComponent userName={"Manuel"}/>
                    </Grid>
                    <Grid item >
                        <Container direction={"column"}>
                            <Grid item >
                                <SearchNavBarComponent/>
                            </Grid>
                            <Grid item >
                                <MailBoxComponent mails={data}/>
                            </Grid>
                        </Container>
                    </Grid>
                </Container>
            </Fragment>
        );
    }


}

export default Dashboard;