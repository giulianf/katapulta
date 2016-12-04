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

export default class Profile extends Component {
  constructor (props){
    super(props);

    this._onChange = this._onChange.bind(this);


    this.state = {
       completed: 0,
       tabContracts: ProvideStore.getTabContract,
       basicInfo: ProvideStore.getBasicInfo,
       basicInfoEmprunteur: ProvideStore.getBasicInfoEmprunteur,
       favoris: ProvideStore.getFavorisEmprunteur
     };
  }

  _onChange() {
      this.setState(ProvideStore.state);
  }

  componentDidMount() {
    ProvideStore.addChangeListener(this._onChange);

    //  this.timer = setTimeout(() => this.progress(5), 10);
   }

   componentWillUnmount() {
    //  clearTimeout(this.timer);
     ProvideStore.removeChangeListener(this._onChange);

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

    const largeTabVisible = (
        <Tabs className="tabs-left" defaultActiveKey={5} id="uncontrolled-tab-lg-example">
            <Tab eventKey={1} title="Basic"><ProfileTabBasic basicInfo={this.state.basicInfo} /></Tab>
            <Tab eventKey={2} title="Basic Emprunteur"><ProfileTabBasicEmprunteur basicInfoEmprunteur={this.state.basicInfoEmprunteur} /></Tab>
            <Tab eventKey={3} title="Contrats Preteur"><ProfileTabContracts tabContracts={this.state.tabContracts} /></Tab>
            <Tab eventKey={4} title="Contrats Emprunteur"></Tab>
            <Tab eventKey={5} title="Emprunteur Favoris"><ProfileTabFavoris favoris={this.state.favoris} /></Tab>
            <Tab eventKey={6} title="Paiements">Tab 4 content</Tab>
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
