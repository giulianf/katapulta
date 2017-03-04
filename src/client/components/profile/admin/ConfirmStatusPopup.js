import React, { Component, PropTypes } from 'react';
import { Modal, Button, Row, Col, FormGroup, ControlLabel, FormControl , Checkbox} from 'react-bootstrap';
// const isNil = require('lodash/isNil');
import _ from 'lodash';
import { getStatusDetail } from '../../../../common/Utility';

class ConfirmStatusPopup extends Component {
    constructor (props){
        super(props);

        this._close = this._close.bind(this);
        this._callbackFunction = this._callbackFunction.bind(this);

        this.state = {status : 'select', notifyUser : true};
    }

    componentDidMount() {
        this.state = {status : 'select', notifyUser : true};
    }

    _close() {
        this.props.closeModal();
    }

    _callbackFunction() {
        this.props.callback(this.state.status, this.state.notifyUser);
        this.props.closeModal();
    }

    render () {
        const { message } = this.props;

        if (!_.isEqual(this.props.typePopup, 'CHANGE') && !_.isEqual(this.props.typePopup, 'BLOCK') && !_.isEqual(this.props.typePopup, 'RAPPEL') ) {
            return null;
        }

        const panelContracts = _.map(getStatusDetail(this.props.contractStatus), status => {
            return (<option key={status.value} value={status.value}>{status.label}</option>);
        });

        const userList =  !_.isNil(this.props.contract) ? (
            _.map(this.props.contract, con => {
                    return (<li><p>{con.nameCompany}</p></li>);
            })
        )
        : null;

        const contract = !_.isNil(this.props.contract) && _.isEqual(this.props.typePopup, 'CHANGE') ? (
            <Row>
            <FormGroup controlId="formHorizontalstatuspopup" >
              <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                Statut
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                  <FormControl componentClass="select" placeholder="select"
                      value={ this.state.status }  onChange={e => { this.setState({ status : e.target.value })}}>
                    <option value="select">select</option>
                    { panelContracts }
                  </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalnot" >
              <Col sm={12} md={8}>
                  <Checkbox checked={ this.state.notifyUser } onChange={e => { this.setState({ notifyUser : !this.state.notifyUser })}}>
                  Notifiez utilisateur?
                </Checkbox>
              </Col>
            </FormGroup>
        </Row>
        )  : null;
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
                  <Row>
                      <Col mdOffset={1} md={12}>
                          <ul>{ userList }</ul>
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
  typePopup: PropTypes.string.isRequired,
  contract: PropTypes.array,
  contractStatus: PropTypes.array,
  buttonConfirmMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  callback: PropTypes.func,
};

export default ConfirmStatusPopup;
