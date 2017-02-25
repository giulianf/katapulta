import React, { Component } from 'react';
import { Grid, Form, Row, Col, PageHeader, FormControl, FormGroup, ControlLabel, Button, Tabs, Tab } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideStore from '../stores/ProvideStore';
import LayoutStore from '../stores/LayoutStore';
import ProvideActions from '../actions/ProvideActions';
import ProfileTabContracts from './profile/contracts/ProfileTabContracts';
import ProfileTabBasic from './profile/basic/ProfileTabBasic';
import ProfileTabBasicEmprunteur from './profile/emprunteur/ProfileTabBasicEmprunteur';
import ProfileTabFavoris from './profile/favoris/ProfileTabFavoris';
import ProfileTabContractEmprunteur from './profile/emprunteur/ProfileTabContractEmprunteur';
import ProfileTabAdmin from './profile/admin/ProfileTabAdmin';
import RefreshIndicator from 'material-ui/RefreshIndicator';

function getProfileState() {
  return {
      completed: 0,
      tabContracts: ProvideStore.getTabContract,
      tabEmprunteurContracts: ProvideStore.getTabEmprunteurContract,
      basicInfo: ProvideStore.getBasicInfo,
      basicInfoEmprunteur: ProvideStore.getBasicInfoEmprunteur,
      favoris: ProvideStore.getFavorisEmprunteur,
      admin: ProvideStore.getAdmin,
      adminContractSelected: ProvideStore.getAdminContractSelected,
      isAdmin: ProvideStore.isAdmin,
      profile: LayoutStore.getProfile,
      pdfPreteur: ProvideStore.getPdfPreteur,
      pdfEmprunteur: ProvideStore.getPdfEmprunteur

  };
}

export default class Profile extends Component {
  constructor (props){
    super(props);

    this._onChange = this._onChange.bind(this);
    this._updateBasicInfo = this._updateBasicInfo.bind(this);
    this._updateEmprunteurBasicInfo = this._updateEmprunteurBasicInfo.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._requestNewEmprunt = this._requestNewEmprunt.bind(this);
    // Admin
    this._changeStatus = this._changeStatus.bind(this);
    this._blockStatus = this._blockStatus.bind(this);
    this._rappelStatus = this._rappelStatus.bind(this);

    this.state = getProfileState();

  }

  _onChange() {
      this.setState(getProfileState());
  }

  _changeStatus(status, notifyUser, isEmprunteur) {
      ProvideActions.changeStatus(this.state.adminContractSelected, status, notifyUser, isEmprunteur);
  }

  _blockStatus(isEmprunteur) {
      ProvideActions.blockStatus(this.state.adminContractSelected, isEmprunteur);
  }

  _rappelStatus(isEmprunteur) {
      ProvideActions.rappelStatus(this.state.adminContractSelected, isEmprunteur);
  }

  componentDidMount() {
    //   ProvideActions.getBasicInfo(this.state.profile);
    //   ProvideActions.getEmprunteurBasicInfo(ProvideStore.getProfile);

    ProvideStore.addChangeListener(this._onChange);
    LayoutStore.addChangeListener(this._onChange);
   }

   componentWillUnmount() {
     ProvideStore.removeChangeListener(this._onChange);
     LayoutStore.removeChangeListener(this._onChange);
   }

   _requestNewEmprunt() {
       ProvideActions.requestNewEmprunt(this.state.profile);
   }

   _updateBasicInfo(basicInfo) {
       ProvideActions.updateSaveBasicInfo(basicInfo);
   }

   _updateEmprunteurBasicInfo(basicInfoEmprunteur) {
       ProvideActions.updateSaveEmprunteurBasicInfo(basicInfoEmprunteur);
   }

    _handleSelect(key) {
        // 3 : contract preteur
        if ( _.isEqual(key, 2) && _.isEmpty(this.state.basicInfoEmprunteur) ) {
            ProvideActions.getEmprunteurBasicInfo(this.state.profile);
        } else if ( _.isEqual(key, 3) && _.isEmpty(this.state.tabContracts.contracts) ) {
            ProvideActions.getContractPreteur(this.state.profile);
        } else if ( _.isEqual(key, 4) && _.isEmpty(this.state.tabEmprunteurContracts.contracts) ) {
            ProvideActions.getContractEmprunteur(this.state.profile);
        } else if ( _.isEqual(key, 5) && !_.isNil(this.state.basicInfo) && !_.isEmpty(this.state.basicInfo.favoris) ) {
            ProvideActions.getAdminFavoris(this.state.basicInfo.favoris);
        } else if ( _.isEqual(key, 6) && (_.isEmpty(this.state.admin.adminEmprunteur.contracts) || _.isEmpty(this.state.admin.adminPreteur.contracts)) ) {
            ProvideActions.getAdminContracts();
        }
    }

  render () {
      const style = {
        container: {
          position: 'relative',
        },
        refresh: {
          display: 'inline-block',
          position: 'relative',
        },
      };

      // BASIC TAB
      const basicTab = !_.isNil(this.state.profile) ? (
          <Tab eventKey={1} title="Basic"><ProfileTabBasic updateBasicInfo={this._updateBasicInfo} profile={this.state.profile} basicInfo={this.state.basicInfo} /></Tab>
      ) : null;

      // EMPRUNTEUR TAB
      const basicEmprunteurTab =  !_.isNil(this.state.profile) && !_.isNil(this.state.basicInfo)
      && this.state.basicInfo.isEmprunteur && !_.isNil(this.state.basicInfoEmprunteur) ? (
          <Tab eventKey={2} title="Basic Emprunteur">
              <ProfileTabBasicEmprunteur profile={this.state.profile} handleSaveEmprunteurBasicInfo={this._updateEmprunteurBasicInfo}
              basicInfoEmprunteur={this.state.basicInfoEmprunteur} /></Tab>
      ) : null;

      const contractPreteurTab = !_.isNil(this.state.profile) && !_.isNil(this.state.tabContracts) ? (
          <Tab eventKey={3} title="Contrats Preteur" ><Col md={8} sm={10}><ProfileTabContracts requestPreteur={this._requestPreteur}
              pdf={this.state.pdfPreteur}
              isPreteur={true}
              tabContracts={this.state.tabContracts} keyTab='profileTabContract' /></Col></Tab>
      ) : null;

      const contractEmprunteurTab = !_.isNil(this.state.profile) && !_.isNil(this.state.tabEmprunteurContracts) && !_.isNil(this.state.basicInfo) && this.state.basicInfo.isEmprunteur ? (
          <Tab eventKey={4} title="Contrats Emprunteur"><ProfileTabContractEmprunteur requestNewEmprunt={this._requestNewEmprunt}
              pdf={this.state.pdfEmprunteur}
              isPreteur={false}
              tabEmprunteurContracts={this.state.tabEmprunteurContracts}  /></Tab>
      ) : null;
      const isAdminTab = !_.isNil(this.state.isAdmin) && this.state.isAdmin && !_.isNil(this.state.admin) ? (
          <Tab eventKey={6} title="Admin">
                   <ProfileTabAdmin
                       changeStatus={this._changeStatus}
                       blockStatus={this._blockStatus}
                       rappelStatus={this._rappelStatus}
                       adminContractSelected={ this.state.adminContractSelected }
                       adminEmprunteur={this.state.admin.adminEmprunteur} adminPreteur={this.state.admin.adminPreteur} />
               </Tab>
      ) : null;

    const largeTabVisible = !_.isNil(this.state.profile) ? (
        <Tabs className="tabs-left" defaultActiveKey={1} id="uncontrolled-tab-lg-example" onSelect={this._handleSelect}>
            { basicTab }
            { basicEmprunteurTab }
            { contractPreteurTab }
            { contractEmprunteurTab }
            <Tab eventKey={5} title="Emprunteur Favoris"><ProfileTabFavoris profile={this.state.profile} favoris={this.state.favoris} /></Tab>
            { isAdminTab }
        </Tabs>
    ) : (<Col mdOffset={5} lgOffset={5}>
        <RefreshIndicator
          size={50}
          left={70}
          top={0}
          loadingColor="#8BC34A"
          status="loading"
          style={style.refresh}
        />
    </Col>);

    return (
      <Grid fluid>
        <Row className='section section-padding'>
            <div className="section-title text-center">
              <h2>Profil <span>utilisateur</span></h2>
              <div></div>
            </div>

            <Col md={12} lg={12} className='space-top-bottom'>
                { largeTabVisible }
            </Col>

        </Row>
      </Grid>

    );
  }
}
