import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInitialMailState, filterMails, setCurrentUser, setInitialFilters } from '../redux/actions/index';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LeftSideMenuComponent from '../components/LeftSideMenuComponent';
import SearchNavBarComponent from '../components/SearchNavBarComponent';
import FilterModalDialogComponent from '../components/FilterModalDialogComponent';
import MailBoxComponent from '../components/MailBoxComponent';
import LoadingComponent from '../components/LoadingComponent';
import PopUpComponent from '../components/PopUpComponent';
import MailDisplayerDialogComponent from '../components/MailDisplayerDialogComponent';
import MailFormDialogComponent from '../components/MailFormDialogComponent';
import LoginManager from '../controlers/LoginManager';
import Mail from '../models/Mail';
import Filter from '../models/Filter';
/**
 * @author Manuel Marcano
 * @class Dashboard
 */
class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            filter: '',
            isLogged: false,
            openFilterModal: false,
            loading: false,
            toast: false,
            openResponsiveDrawer: false,
            selectedMail: null,
            errorRequest: null,
            openMailForm: false,
            showSentMails: false
        };
        this.onChange = this.onChange.bind(this);
        this.getPrevSearch = this.getPrevSearch.bind(this);
        this.handleSaveSearch = this.handleSaveSearch.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.filterClick = this.filterClick.bind(this);
        this.handleDrawer = this.handleDrawer.bind(this);
        this.handleToast = this.handleToast.bind(this);
        this.handleSelectedMail = this.handleSelectedMail.bind(this);
        this.handleCloseMailModal = this.handleCloseMailModal.bind(this);
        this.handleMailForm = this.handleMailForm.bind(this);
        this.handleSaveMail = this.handleSaveMail.bind(this);
        this.openSentMails = this.openSentMails.bind(this);
    }

    openSentMails () {
        this.setState((oldState) => {
            return { showSentMails: !oldState.showSentMails };
        });
    }

    handleMailForm () {
        this.setState((oldState) => {
            return { openMailForm: !oldState.openMailForm };
        });
    }

    /* Handlers que manejar cambios de estados en el dashboard, no tiene documentacion ya que hacen cosas basicas */

    handleCloseMailModal () {
        this.setState({ selectedMail: null });
    }

    handleSelectedMail (e, id) {
        let mail = this.props.mail.find((mail) => { return mail.id === id });
        mail = (typeof mail === 'undefined') ? {} : mail;
        this.setState({ selectedMail: mail });
    }

    handleToast () {
        this.setState((oldState) => {
            return { toast: !oldState.toast, errorRequest: null };
        });
    }

    handleDrawer () {
        this.setState((oldState) => {
            return { openResponsiveDrawer: !oldState.openResponsiveDrawer };
        });
    }

    handleCloseModal () {
        this.setState((oldState) => {
            return { openFilterModal: !oldState.openFilterModal };
        });
    }

    /**
     * @description Cada vez que cambia filtra los mail de la dashboard
     * filterMails despacha un evento a redux para que filtre los mails
     * @param filter {string}
     **/
    onChange (filter) {
        this.setLoading();
        this.setState({ filter }, () => {
            this.filterMails();
        });
        this.setLoading();
    }

    handleBadRequest (res) {
        this.setState({
            errorRequest: res.error
        });
    }

    /**
     * @description Abre modal para ver los filtros guardados en el servidor
     * @param e {object}
     **/
    getPrevSearch (e) {
        this.setState({ openFilterModal: true });
    }

    setLoading () {
        this.setState((prevState) => {
            return { loading: !prevState.loading };
        });
    }

    filterMails () {
        this.props.filterMails(this.props.mail, this.state.filter);
    }

    /**
     * @description cuando se seleciona un filtro de los anteriores guardados este coloca como valor en el filtro actual
     * para filtrar mails.
     * Observacion: No se traen los mails guardados con este filtro ya que si eliminas uno no va a estar, por ende es lo mismo que
     * filtrar los correos actuales
     * @param filter {string}
     **/
    filterClick (filter) {
        this.setLoading();
        this.setState({ filter }, () => {
            this.filterMails();
        });
        this.setLoading();
    }

    /**
     * @description Se encarga de guardar el filtro escrito en el servidor
     * @param e {object} evento
     **/
    async handleSaveSearch (e) {
        this.setLoading();
        if (this.props.results.length > 0) {
            const obj = {
                filter: this.state.filter,
                userid: this.props.user.id,
                username: this.props.user.username
            };
            obj.mailsid = this.props.results.map((mail) => mail.id).join(',');
            const filter = new Filter(obj);
            const res = await filter.save();
            if (!res.ok) {
                this.handleBadRequest(res);
                return;
            }
        }
        await this.props.setInitialFilters(await Filter.getFilters());
        this.setState({ filter: '' });
        this.handleToast();
        this.setLoading();
    }

    /**
     * @description maneja el guardado del mails
     * @param info {Object} info del mail
     **/
    async handleSaveMail (info) {
        info.type = Mail.TYPE_SENT;
        this.handleMailForm();
        this.setLoading();
        const mail = new Mail(info);
        const res = await mail.save();
        if (!res.ok) {
            this.handleBadRequest(res);
            return;
        }
        this.props.setInitialMailState(await Mail.getMails());
        this.handleToast();
        this.setLoading();
    }

    /**
     * @description Inicia los recursos necesarios para cargar el dashboard
     * setea el usario (si su token sigue valido)
     * trae los mails del servidor
     * trae los filtros guardados del servidor
     **/
    async setInitialResources () {
        this.setLoading();
        const res = await LoginManager.isLogged();
        if (!res) {
            window.location = '/';
            return;
        }
        this.setState({ isLogged: true });
        this.props.setCurrentUser();
        this.props.setInitialMailState(await Mail.getMails());
        this.props.setInitialFilters(await Filter.getFilters());
        this.setLoading();
    }

    async componentDidMount () {
        await this.setInitialResources();
    }

    render () {
        const { results, mail } = this.props;
        const sentData = mail.filter((senMa) => { return senMa.type === Mail.TYPE_SENT }); // Obtengo los mails enviados

        let data = (results.length > 0) ? results : mail;
        if (this.state.showSentMails) { data = data.filter((singlMail) => { return singlMail.type === Mail.TYPE_SENT }) } // Se hace para que Mailbox solo muestre los enviados si se eligio dicha opcion
        const username = `${this.props.user.lastname} ${this.props.user.firstname}`;
        return (
            <Grid container direction="row" >
                { (this.state.toast || this.state.errorRequest) && <PopUpComponent toast={this.state.toast}
                    onClose={this.handleToast}
                    message={ (this.state.errorRequest) ? this.state.errorRequest : 'Saved!!!' }
                    type={(this.state.errorRequest) ? 'error' : 'success'}/>
                }
                { this.state.openFilterModal && <FilterModalDialogComponent open={this.state.openFilterModal} // Hago esto porquew cuando se cerraba el modal, no se destruia el Dialog y la pantalla me quedaba bloquedada
                    onFilterClick={ this.filterClick }
                    onClose={this.handleCloseModal}
                    filters={this.props.filters}/>}

                { this.state.selectedMail && <MailDisplayerDialogComponent onClose={this.handleCloseMailModal} // Hago esto porquew cuando se cerraba el modal, no se destruia el Dialog y la pantalla me quedaba bloquedada
                    mail={this.state.selectedMail}/>}

                { this.state.openMailForm && <MailFormDialogComponent onClose={this.handleMailForm} save={this.handleSaveMail}/>} 

                <Grid item xs={2}>
                    <LeftSideMenuComponent userName={username} mails={mail}
                        changeSeleted={this.state.showSentMails}
                        sentMails={sentData}
                        open={this.state.openResponsiveDrawer}
                        onOpenSent={this.openSentMails}
                        onClose={this.handleDrawer}/>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Container direction={'column'}>
                        <Grid item >
                            <SearchNavBarComponent
                                value={this.state.filter}
                                onChange={ this.onChange }
                                saveSearch={this.handleSaveSearch}
                                prevSearch={ this.getPrevSearch }
                                openDrawer={ this.handleDrawer }
                                openMailForm={ this.handleMailForm }
                                disableButtons={ this.state.loading }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingComponent loading={this.state.loading } grid={12}/>
                            { !this.state.loading && <MailBoxComponent mails={data} selectedMail={this.handleSelectedMail}/> }
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        );
    }
}

/* Redux Logic */
const mapStateToProps = (state) => {
    return {
        mail: state.mail,
        results: state.results,
        user: state.user,
        filters: state.filters
    };
};

const mapDispatchToProps = {
    setInitialMailState,
    filterMails,
    setCurrentUser,
    setInitialFilters
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
