import React, { Component } from 'react';
import ProvideActions from '../../../actions/ProvideActions';
import { Button} from 'react-bootstrap';

export default class DetailButton extends Component{
  constructor(props) {
    super(props);

    this._handleDetails = this._handleDetails.bind(this);
  }

  _handleDetails() {
      // Action to see stepper
      ProvideActions.stepperDetail(this.props.rowData.contractId);
  }

  render() {
    return (
        <Button onClick={this._handleDetails} bsStyle='success'>Détails</Button>
    );
  }
}
