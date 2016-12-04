import React from 'react';
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
class VerticalLinearStepper extends React.Component {
    constructor (props){
      super(props);
      this.state = {
        stepWorkflow: ProvideStore.getStepWorkflow
      };

      this._close = this._close.bind(this);
    }

    _close() {
        ProvideActions.closeStepperDetail();
    }

  render() {
    const { visible, stepIndex, nomEmprunteur } = this.state.stepWorkflow;

    return (
        <Col md={6} lgHidden>
            <Modal bsSize="small" show={visible} onHide={this._close}>
             <Modal.Header closeButton>
               <Modal.Title>Suivi du contrat {nomEmprunteur}</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                   <Stepper activeStep={stepIndex} orientation="vertical">
                     <Step>
                       <StepLabel>Informations de base</StepLabel>
                       <StepContent>
                         <p>
                           Veuillez remplir vos coordonnées de votre profil.
                         </p>
                       </StepContent>
                     </Step>
                     <Step>
                       <StepLabel>Selection emprunteur</StepLabel>
                       <StepContent>
                         <p>Selectionnez un emprunteur que vous souhaitez financer.</p>
                       </StepContent>
                     </Step>
                     <Step>
                       <StepLabel>Create an ad</StepLabel>
                       <StepContent>
                         <p>
                           Try out different ad text to see what brings in the most customers,
                           and learn how to enhance your ads using features like ad extensions.
                           If you run into any problems with your ads, find out how to tell if
                           they're running and how to resolve approval issues.
                         </p>
                       </StepContent>
                     </Step>
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

export default VerticalLinearStepper;
