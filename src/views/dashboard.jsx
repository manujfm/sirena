import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import LeftSideMenuComponent from "../components/LeftSideMenuComponent"
import SearchNavBarComponent from "../components/SearchNavBarComponent"
import MailBoxComponent from "../components/MailBoxComponent"
import setInitialMailState from "../redux/actions/setIntialMailState";
import filterMails from "../redux/actions/filterMails";
import Mail from "../models/Mail";

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ""
        };
        this.onChange = this.onChange.bind(this);
        this.getPrevSearch = this.getPrevSearch.bind(this);
    }

    onChange(event){
        let value = event.target.value;
        this.setState({value}, ()=>{
            this.filterMails()
        });
    }

    handleSaveSearch(e){

    }

    getPrevSearch(e){

    }

    filterMails(){
        this.props.filterMails(this.props.mail, this.state.value);

    }

    async componentDidMount() {
        this.props.setInitialMailState(await Mail.getMails());
    }

    render() {
        let {results, mail} = this.props;
        let data =  ( results.length > 0 ) ? results: mail;
        return (
            <Fragment>
                <Container direction="row" spacing={0}>
                    <Grid  item xs={2}>
                        <LeftSideMenuComponent userName={"Manuel"}/>
                    </Grid>
                    <Grid item >
                        <Container direction={"column"}>
                            <Grid item >
                                <SearchNavBarComponent onChange={ this.onChange } saveSearch={this.handleSaveSearch}  prevSearch={ this.getPrevSearch }/>
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

const mapStateToProps = ( state ) => {
    return {
        mail: state.mail,
        results: state.results
    }
};

const mapDispatchToProps = {
    setInitialMailState,
    filterMails
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);