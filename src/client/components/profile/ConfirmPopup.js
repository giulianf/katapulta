import React, { Component, PropTypes } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

class ConfirmPopup extends Component {
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
  callback: PropTypes.func,
};

export default ConfirmPopup;
