import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import LeftSideMenuComponent from "../components/LeftSideMenuComponent"
import SearchNavBarComponent from "../components/SearchNavBarComponent"
import FilterModalDialogComponent from "../components/FilterModalDialogComponent"
import MailBoxComponent from "../components/MailBoxComponent"
import LoginManager from "../controlers/LoginManager";
import Mail from "../models/Mail";
import Filter from "../models/Filter";
import LinearProgress from "@material-ui/core/LinearProgress";
import PopUpComponent from "../components/PopUpComponent";
import setInitialMailState from "../redux/actions/setIntialMailState";
import filterMails from "../redux/actions/filterMails";
import setCurrentUser from "../redux/actions/setCurrentUser";
import setInitialFilters from "../redux/actions/setInitialFilters";

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            filter: "",
            isLogged: false,
            openFilterModal: false,
            loading: false,
            toast: false,
            openResponsiveDrawer: false
        };
        this.onChange = this.onChange.bind(this);
        this.getPrevSearch = this.getPrevSearch.bind(this);
        this.handleSaveSearch = this.handleSaveSearch.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.filterClick = this.filterClick.bind(this);
        this.handleDrawer = this.handleDrawer.bind(this);
    }

    handleDrawer(){
        console.log("AAAAAAAAAAAAAAAAA")
        this.setState( (oldState) => {
            return  {openResponsiveDrawer: !oldState.openResponsiveDrawer}
        })
    }

    handleCloseModal(){
        this.setState( (oldState) => {
           return  {openFilterModal: !oldState.openFilterModal}
        })
    }

    onChange(filter){
        this.setLoading();
        this.setState({filter}, ()=>{
            this.filterMails()
        });
        this.setLoading()
    }

    handleBadRequest(){}

    getPrevSearch(e){
        this.setState({openFilterModal: true})
    }

    setLoading(){
        this.setState((prevState) => {
            return {loading: !prevState.loading}
        })
    }

    filterMails(){
        this.props.filterMails(this.props.mail, this.state.filter);
    }


    filterClick(filter){
        this.setLoading()
        this.setState({filter}, () => {
            this.filterMails()
        })
        this.setLoading()
    }

    async handleSaveSearch(e){
        this.setLoading();
        if ( this.props.results.length > 0 ){
            let obj = {
                filter: this.state.filter,
                userid: this.props.user.id,
                username: this.props.user.username,
            };
            obj.mailsid = this.props.results.map( (mail) =>  mail.id ).join(",");
            let filter = new Filter(obj);
            let res = await filter.save();
            if ( !res.ok ) this.handleBadRequest()
        }
        await this.props.setInitialFilters(await Filter.getFilters());
        this.setState({filter:""})
        this.setLoading();
    }

    async setInitialResources(){
        this.setLoading();
        let res = await LoginManager.isLogged();
        if ( !res ) {
            window.location = "/";
            return
        }
        this.setState({isLogged: true});
        this.props.setCurrentUser();
        this.props.setInitialMailState(await Mail.getMails());
        this.props.setInitialFilters(await Filter.getFilters());
        this.setLoading()
    }

    async componentDidMount() {
        await this.setInitialResources()
    }


    render() {
        let {results, mail} = this.props;
        let data =  ( results.length > 0 ) ? results : mail;
        let username = `${this.props.user.lastname} ${this.props.user.firstname}`;
        return (
                <Grid container direction="row" >
                    <PopUpComponent toast={this.state.toast}/>
                    { this.state.openFilterModal && <FilterModalDialogComponent open={this.state.openFilterModal}
                                                                                onFilterClick={ this.filterClick }
                                                                                onClose={this.handleCloseModal}
                                                                                filters={this.props.filters}/>}
                    <Grid item xs={2}>
                        <LeftSideMenuComponent userName={username} open={this.state.openResponsiveDrawer} onClose={this.handleDrawer}/>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Container direction={"column"}>
                            <Grid item >
                                <SearchNavBarComponent
                                    value={this.state.filter}
                                    onChange={ this.onChange }
                                    saveSearch={this.handleSaveSearch}
                                    prevSearch={ this.getPrevSearch }
                                    openDrawer={ this.handleDrawer }
                                    // disableButtons={ this.state.loading }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                { this.state.loading &&
                                    <Grid item xs={12} style={{marginTop:"90px"}}>
                                        <LinearProgress variant={"query"}  />
                                    </Grid>
                                }
                                { !this.state.loading && <MailBoxComponent mails={data}/> }
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        mail: state.mail,
        results: state.results,
        user: state.user,
        filters: state.filters
    }
};

const mapDispatchToProps = {
    setInitialMailState,
    filterMails,
    setCurrentUser,
    setInitialFilters
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);