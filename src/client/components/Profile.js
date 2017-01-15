import React, { Component } from 'react';
import { Grid, Form, Row, Col, PageHeader, FormControl, FormGroup, ControlLabel, Button, Tabs, Tab } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideStore from '../stores/ProvideStore';
import ProvideActions from '../actions/ProvideActions';
import ProfileTabContracts from './profile/contracts/ProfileTabContracts';
import ProfileTabBasic from './profile/basic/ProfileTabBasic';
import ProfileTabBasicEmprunteur from './profile/emprunteur/ProfileTabBasicEmprunteur';
import ProfileTabFavoris from './profile/favoris/ProfileTabFavoris';
import ProfileTabContractEmprunteur from './profile/emprunteur/ProfileTabContractEmprunteur';
import async from 'async';

function getProfileState() {
  return {
      completed: 0,
      tabContracts: ProvideStore.getTabContract,
      basicInfo: ProvideStore.getBasicInfo,
      basicInfoEmprunteur: ProvideStore.getBasicInfoEmprunteur,
      favoris: ProvideStore.getFavorisEmprunteur,
      isAdmin: ProvideStore.isAdmin,
      profile: ProvideStore.getProfile
  };
}

export default class Profile extends Component {
  constructor (props){
    super(props);
    ProvideActions.getBasicInfo(ProvideStore.getProfile);
    ProvideActions.getEmprunteurBasicInfo(ProvideStore.getProfile);

    this._onChange = this._onChange.bind(this);
    this._updateBasicInfo = this._updateBasicInfo.bind(this);
    this._updateEmprunteurBasicInfo = this._updateEmprunteurBasicInfo.bind(this);
    this._handleSelect = this._handleSelect.bind(this);

    this.state = getProfileState();

  }

  _onChange() {
      this.setState(getProfileState());
  }

  componentDidMount() {
    ProvideStore.addChangeListener(this._onChange);

    //  this.timer = setTimeout(() => this.progress(5), 10);
   }

   componentWillUnmount() {
    //  clearTimeout(this.timer);
     ProvideStore.removeChangeListener(this._onChange);
   }

   _updateBasicInfo(basicInfo) {
       ProvideActions.updateSaveBasicInfo(basicInfo);
   }

   _updateEmprunteurBasicInfo(basicInfoEmprunteur) {
       ProvideActions.updateSaveEmprunteurBasicInfo(basicInfoEmprunteur);
   }

    _handleSelect(key) {
        // 3 : contract preteur
        if ( _.isEqual(key, 3) && _.isNil(this.state.tabContracts.contracts) ) {
            ProvideActions.getContractPreteur(this.state.profile);
        }
    }

   //
  //  progress(completed) {
  //    if (completed > 100) {
  //      this.setState({completed: 100});
  //    } else {
  //      this.setState({completed});
  //      const diff = Math.random() * 10;
  //      this.timer = setTimeout(() => this.progress(completed + diff), 100);
  //    }
  //  }

  render () {
      const basicEmprunteurTab = !_.isNil(this.state.basicInfo) && this.state.basicInfo.isEmprunteur ? (
          <Tab eventKey={2} title="Basic Emprunteur"><ProfileTabBasicEmprunteur handleSaveEmprunteurBasicInfo={this._updateEmprunteurBasicInfo}
              {...this.state} /></Tab>
      ) : null;
      const conractEmprunteurTab = !_.isNil(this.state.basicInfo) && this.state.basicInfo.isEmprunteur ? (
          <Tab eventKey={4} title="Contrats Emprunteur"><ProfileTabContractEmprunteur  tabContracts={this.state.tabContracts}  /></Tab>
      ) : null;
      const isAdminTab = !_.isNil(this.state.isAdmin) && this.state.isAdmin ? (
              <Tab eventKey={6} title="Admin">Tab 4 content</Tab>
      ) : null;

    const largeTabVisible = (
        <Tabs className="tabs-left" defaultActiveKey={1} id="uncontrolled-tab-lg-example" onSelect={this._handleSelect}>
            <Tab eventKey={1} title="Basic"><ProfileTabBasic updateBasicInfo={this._updateBasicInfo} basicInfo={this.state.basicInfo} /></Tab>
            { basicEmprunteurTab }
            <Tab eventKey={3} title="Contrats Preteur" ><Col md={8} sm={10}><ProfileTabContracts {...this.state} keyTab='profileTabContract' /></Col></Tab>
            { conractEmprunteurTab }
            <Tab eventKey={5} title="Emprunteur Favoris"><ProfileTabFavoris favoris={this.state.favoris} /></Tab>
            { isAdminTab }
        </Tabs>
    );

    return (
      <Grid fluid>
        <Row className='section section-padding'>
            <div className="section-title text-center">
              <h2>Profil <span>utilisateur</span></h2>
              <div></div>
            </div>

            <Col md={12} className='space-top-bottom'>
                { largeTabVisible }
            </Col>

        </Row>
      </Grid>

    );
  }
}
