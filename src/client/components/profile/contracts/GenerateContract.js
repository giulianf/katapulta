import React, { Component } from 'react';
import ProvideActions from '../../../actions/ProvideActions';
import { Button} from 'react-bootstrap';

export default class GenerateContract extends Component{
  constructor(props) {
    super(props);

    this._handleDetails = this._handleDetails.bind(this);
  }

  _handleDetails() {
      // Action to see stepper
      ProvideActions.generateContract(this.props.contractId);
  }

  render() {
    return (
        <Button disabled={this.props.wait} onClick={this._handleDetails} bsStyle='warning'>{!this.props.wait ? "Détails": "Attendez"}</Button>
    );
  }
}
