import React, { Component, PropTypes } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends Component {

    constructor(props) {
        super(props);

        this.state = {
          finished: false,
          stepIndex: 0,
        };
    }

  handleNext = () => {
    const {stepIndex} = this.state;
    const statusSize = _.size(this.props.list);


    // find the next one
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= statusSize - 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
     const step = this.props.list;
     const stepDescription = step[stepIndex];

    //  return "Ceci n'appartient pas à notre procédure";
     return !_.isNil(stepDescription) ? stepDescription.description : "Ceci n'appartient pas à notre procédure";
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const statusSize = _.size(this.props.list);

    const statusStep = _.map( this.props.list, status => {
        return (
            <Step>
              <StepLabel>{status.label}</StepLabel>
            </Step>
        );
    });


    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation={this.props.orientation}>
            { statusStep }
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Cliquer ici
            </a> pour remettre au début
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === statusSize - 1 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  list: PropTypes.array.isRequired,
  orientation: PropTypes.string.isRequired,
};

export default HorizontalLinearStepper;
