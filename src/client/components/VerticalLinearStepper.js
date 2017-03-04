import React, { Component, PropTypes } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Modal, Button, Col } from 'react-bootstrap';
import ProvideActions from '../actions/ProvideActions';
import ProvideStore from '../stores/ProvideStore';

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends Component {
    constructor (props){
      super(props);
    //   this.state = {
    //     stepWorkflow: ProvideStore.getStepWorkflow
    //   };

      this._close = this._close.bind(this);
    }

    _close() {
        ProvideActions.closeStepperDetail();
    }

  render() {
    const { visible, stepIndex, nomEmprunteur } = this.props.stepWorkflow;

    const statusStep = _.map( this.props.list, status => {
        return (
            <Step>
              <StepLabel>{status.label}</StepLabel>
              <StepContent>
                <p>
                  { status.description }
                </p>
              </StepContent>
            </Step>
        );
    });

    return (
        <Col md={6} lgHidden>
            <Modal bsSize="small" show={visible} onHide={this._close}>
             <Modal.Header closeButton>
               <Modal.Title>Suivi du contrat {nomEmprunteur}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div style={{maxWidth: 380, margin: 'auto'}}>
                   <Stepper activeStep={stepIndex} orientation="vertical">
                       { statusStep }
                   </Stepper>
                 </div>
                </Modal.Body>
             <Modal.Footer>
               <Button onClick={this._close}>Close</Button>
             </Modal.Footer>
            </Modal>
        </Col>
    );
  }
}

VerticalLinearStepper.propTypes = {
  stepWorkflow: PropTypes.object.isRequired,
  list: PropTypes.func.isRequired,
};

export default VerticalLinearStepper;
