import React, { Component } from 'react';
import { Grid, Row, Col, Button , FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import _ from 'lodash';

export default class FieldGroup extends Component {
  constructor (props){
    super(props);
  }

  render () {
    const id = this.props.id;
    const label = !_.isNil(this.props.label) ? (<ControlLabel>{label}</ControlLabel>) : null;
    const help = this.props.help;
    return (
      <FormGroup controlId={id} bsSize="large">
        {label}
        <FormControl {...this.props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}
