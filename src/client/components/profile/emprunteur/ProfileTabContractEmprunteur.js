import React, { Component } from 'react';
import { Grid, Form, Row, Col, Button, Panel, Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import HorizontalLinearStepper from '../../HorizontalLinearStepper';
import ProfileTabContracts from '../contracts/ProfileTabContracts';

export default class ProfileTabContractEmprunteur extends Component {
  constructor (props){
    super(props);

    this.state = {file: {}, imagePreviewUrl : {}, imageFiles:[] }

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
            <Grid>
                <Col md={10} sm={10}>
                    <OverlayTrigger placement="right" overlay={tooltip}>
                        <Button bsStyle='primary' className='btn-flat'><Glyphicon  glyph='plus' ></Glyphicon> Demande d'emprunt</Button>
                    </OverlayTrigger>
                </Col>
                <Col md={10} sm={10} smHidden xsHidden className='space-top-bottom'>
                    <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      en savoir plus
                  </a>
                  <Panel collapsible expanded={this.state.open}>
                      <HorizontalLinearStepper orientation="horizontal"></HorizontalLinearStepper>
                 </Panel>
                </Col>
                <Col md={10} sm={10} lgHidden mdHidden className='space-top-bottom'>
                    <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      en savoir plus
                  </a>
                  <Panel collapsible expanded={this.state.open}>
                      <HorizontalLinearStepper orientation="vertical"></HorizontalLinearStepper>
                 </Panel>
                </Col>
                    <Col md={10} sm={10} className='space-top-bottom'>
                    <ProfileTabContracts tabContracts={this.props.tabContracts} />
                    </Col>
            </Grid>
        )
    }
}
