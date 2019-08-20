import React, {Component, Fragment} from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class ErrorPage extends Component {

    render() {
        return (
          <Fragment>
              <Grid container direction={"row"} alignContent={"center"} alignItems={"center"}>
                      <Typography style={{textAlign:"center"}} display={"block"}  variant={"h2"}> 404 NOT FOUND :(</Typography>

              </Grid>
          </Fragment>
        );
    }


}

export default ErrorPage;