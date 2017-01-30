import React, { Component } from 'react';
import { Grid, Form, Row, Col, Button, Panel, Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import HorizontalLinearStepper from '../../HorizontalLinearStepper';
import ContractsList from '../contracts/ContractsList';
import ConfirmPopup from '../ConfirmPopup';
import { getStatusHeader, getStatusDetail } from '../../../../common/Utility';
import statusEmprunteur from '../../../../data/statusEmprunteur';
export default class ProfileTabContractEmprunteur extends Component {
  constructor (props){
    super(props);

    this._showEmprunteurPopup = this._showEmprunteurPopup.bind(this);
    this._closeEmprunteurPopup = this._closeEmprunteurPopup.bind(this);
    this._requestEmprunteur= this._requestEmprunteur.bind(this);

    this.state = {openRequest: false};

  }

  _showEmprunteurPopup() {
      this.setState({ openRequest: true });
  }

  _closeEmprunteurPopup() {
      this.setState({ openRequest: false });
  }

  _requestEmprunteur() {
      this.props.requestNewEmprunt();

    //   alert('envoyer');
    //   this.setState({ openRequest: true });
  }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

   _handleSaveBasicInfo() {
       // Save action for Server
   }
    render () {
        const tooltip = (
          <Tooltip id="tooltip"><strong>Faites </strong> une demande d'emprunt avec Katapulta et attendez notre mail de suivi</Tooltip>
        );

        return (
            <Grid keyTab='profileTabEmprunteurContract' >
                <Col md={10} sm={10}>
                    <OverlayTrigger placement="right" overlay={tooltip}>
                        <Button bsStyle='primary' className='btn-flat' onClick={this._showEmprunteurPopup}><Glyphicon  glyph='plus' ></Glyphicon> Demande d'emprunt</Button>
                    </OverlayTrigger>
                </Col>
                <Col md={10} sm={10} smHidden xsHidden className='space-top-bottom'>
                    <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      en savoir plus
                  </a>
                  <Panel collapsible expanded={this.state.open}>
                      <HorizontalLinearStepper orientation="horizontal" list={getStatusHeader(statusEmprunteur)}></HorizontalLinearStepper>
                 </Panel>
                </Col>
                <Col md={10} sm={10} lgHidden mdHidden className='space-top-bottom'>
                    <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      en savoir plus
                  </a>
                  <Panel collapsible expanded={this.state.open}>
                      <HorizontalLinearStepper orientation="vertical" list={getStatusHeader(statusEmprunteur)}></HorizontalLinearStepper>
                 </Panel>
                </Col>
                <Col md={10} sm={10} className='space-top-bottom'>
                    <ContractsList  keyTab='profileTabEmpContract' tabContracts={this.props.tabEmprunteurContracts}
                        statusContract={getStatusDetail(statusEmprunteur)} stepWorkflow={this.props.tabEmprunteurContracts.stepWorkflow} />
                </Col>

                    <ConfirmPopup showModal={this.state.openRequest} title="Demande d'emprunt"
                        message="Vous êtes sur le point de faire une demande de prêt à l'aide de Katapulta. Êtes-vous sûre?"
                        closeModal={ this._closeEmprunteurPopup }
                        buttonConfirmMessage="Envoyer" callback={this._requestEmprunteur} />

            </Grid>
        )
    }
}
