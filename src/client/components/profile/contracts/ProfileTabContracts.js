import React, { Component } from 'react';
import { Grid, Row, Col, Panel} from 'react-bootstrap';
import ContractsList from './ContractsList';
import { getStatusHeader, getStatusDetail } from '../../../../common/Utility';
import statusPreteur from '../../../../data/statusPreteur';
import HorizontalLinearStepper from '../../HorizontalLinearStepper';

export default class ProfileTabContracts extends Component {
    constructor (props){
        super(props);

        this.state = { open: false};
    }

    render () {
        return (
            <Grid key={ this.props.keyTab } >
                <Col md={10} sm={10} smHidden xsHidden className='space-top-bottom'>
                    <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      en savoir plus
                  </a>
                  <Panel collapsible expanded={this.state.open}>
                      <HorizontalLinearStepper orientation="horizontal" list={getStatusHeader(statusPreteur)} ></HorizontalLinearStepper>
                 </Panel>
                </Col>
                <Col md={10} sm={10} lgHidden mdHidden className='space-top-bottom'>
                    <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                      en savoir plus
                  </a>
                  <Panel collapsible expanded={this.state.open}>
                      <HorizontalLinearStepper orientation="vertical" list={getStatusHeader(statusPreteur)} ></HorizontalLinearStepper>
                 </Panel>
                </Col>
                <Col md={10} sm={10} className='space-top-bottom'>
                    <ContractsList tabContracts={this.props.tabContracts} keyTab='ContractsListPreteur'
                        statusContract={getStatusDetail(statusPreteur)} stepWorkflow={this.props.tabContracts.stepWorkflow} />
                </Col>

            </Grid>
        );
    }
}
