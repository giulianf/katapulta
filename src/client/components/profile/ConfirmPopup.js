import React, { Component, PropTypes } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

class ConfirmPopup extends Component {
    constructor (props){
        super(props);

        this._close = this._close.bind(this);
        this._callbackFunction = this._callbackFunction.bind(this);

        this.state = {montant: this.props.valuePret};
    }

    _close() {
        this.props.closeModal();
    }

    _callbackFunction() {
        this.props.callback(this.state.montant);
        this.props.closeModal();
    }

    render () {
        const { message } = this.props;

        const valuePret = this.props.valuePret ? (
            <Row>
            <Col md={12}>
            <FormGroup controlId="formHorizontalPret" >
              <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                Montant du prêt
              </Col>
              <Col sm={12} md={8}>
                <FormControl type="number" placeholder="Montant"
                    onChange={this.setState({montant: e.target.value})}  value={this.state.montant}/>
              </Col>
            </FormGroup>
            </Col>
        </Row>
    ): null
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
                  { valuePret }
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={this._close}>Fermer</Button>
                <Button bsStyle="primary" onClick={this._callbackFunction}>{this.props.buttonConfirmMessage}</Button>
              </Modal.Footer>

            </Modal>
        );
    }
}

ConfirmPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonConfirmMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  valuePret: PropTypes.number,
  callback: PropTypes.func,
};

export default ConfirmPopup;
