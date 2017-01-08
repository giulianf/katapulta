import React, { Component } from 'react';
import ContractsList from './ContractsList';
import ProvideActions from '../../../actions/ProvideActions';
import ProvideStore from '../../../stores/ProvideStore';

export default class ProfileTabContracts extends Component {
    constructor (props){
        super(props);

        ProvideActions.getContractPreteur(this.props.profile);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render () {
        return (
            <div key={this.props.keyTab}>
                <ContractsList {...this.props} keyTab='ContractsListPreteur'/>
            </div>
        );
    }
}
