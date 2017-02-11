import React, { Component, PropTypes } from 'react';
import { Modal, Button, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
const isNil = require('lodash/isNil');
import { getStatusDetail } from '../../../common/Utility';

class ConfirmStatusPopup extends Component {
    constructor (props){
        super(props);

        this._close = this._close.bind(this);
        this._callbackFunction = this._callbackFunction.bind(this);
    }

    _close() {
        this.props.closeModal();
    }

    _callbackFunction() {
        this.props.callback();
        this.props.closeModal();
    }

    render () {
        const { message } = this.props;

        const panelContracts = _.map(getStatusDetail(this.props.contractStatus), status => {
            return (<option value={status.value}>{status.label}</option>);
        });

        const contract = !isNil(this.props.contract) ? (<Row>
            <Col md={12}>
                { this.props.contract }
            </Col>
            <FormGroup controlId="formHorizontalstatuspopup" >
              <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                Statut
              </Col>
              <Col xs={2} sm={2} md={2}>
                  <FormControl componentClass="select" placeholder="select"
                      value={ this.state.status } >
                    <option value="select">select</option>
                    { panelContracts }
                  </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalnot" >
              <Col sm={12} md={8}>
                  <Checkbox checked={ this.state.notifyUser } >
                  Notifiez utilisateur?
                </Checkbox>
              </Col>
            </FormGroup>
        </Row>)  : null;
        return (
            <Modal show={this.props.showModal} onHide={this._close}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Row>
                      <Col md={12}>
                          { message }
                      </Col>
                  </Row>
                  { contract }
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this._close}>Fermer</Button>
                <Button bsStyle="primary" onClick={this._callbackFunction}>{this.props.buttonConfirmMessage}</Button>
              </Modal.Footer>

            </Modal>
        );
    }
}

ConfirmStatusPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  contract: PropTypes.array,
  contractStatus: PropTypes.array,
  buttonConfirmMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  callback: PropTypes.func,
};

export default ConfirmStatusPopup;
