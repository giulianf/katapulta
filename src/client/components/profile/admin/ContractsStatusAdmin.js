import React, { Component } from 'react';
import { Grid, Form, Row, Col, PanelGroup, Panel, Button, Glyphicon , Tooltip, OverlayTrigger} from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { getStatusDetail } from '../../../../common/Utility';
import ProvideActions from '../../../actions/ProvideActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {ConfirmStatusPopup} from '../ConfirmStatusPopup';

class ContractsStatusAdmin extends Component {
  constructor (props){
    super(props);

    this._changeContractStatus = this._changeContractStatus.bind(this);
    this._blockContract = this._blockContract.bind(this);
    this._rappelContract = this._rappelContract.bind(this);
    this._openPopup = this._openPopup.bind(this);

    this.state = { openChangeStatus : false, openBlockStatus: false, openRappelStatus: false};

  }

  _openPopup() {
        this.setState({openChangeStatus: true});
  }

  _changeContractStatus() {
      this.props.changeContractStatus;
  }

  _blockContract() {
      this.props.blockContract;
  }

  _rappelContract() {
      this.props.rappelContract;
  }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

    render () {
        if (_.isNil(this.props.contracts)) {
            return null;
        }
        const rightTooltip = (
            <Tooltip id="righttooltip">Modifier le <strong>Statut.</strong></Tooltip>
        );
        const blockTooltip = (
            <Tooltip id="righttooltip">Bloquer.</Tooltip>
        );
        const rappelTooltip = (
            <Tooltip id="righttooltip">Rappel.</Tooltip>
        );
        let index = 0;
        // list all possible status contract
        const panelContracts = _.map(getStatusDetail(this.props.contractStatus), status => {
            index ++;
            let nb = 0;

            _.forEach(this.props.contracts, con => {
                if (_.isEqual(status.label, con.status)) {
                    return nb++;
                }
            });

            const nbContract = nb;

            let className= 'badge-success';
            if (nbContract > 0 && nbContract <= 10) {
                className = 'badge-warning';
            } else if (nbContract > 10) {
                className = 'badge-info';
            }
            const headder = (
                    <span>{status.label}
                        <span className={`badge ${className} floatRight`}>{ nbContract }</span>
                    </span>
            );

            const contractResult =  _.filter(this.props.contracts, {status : status.label} );
            const contracts = !_.isNil(this.props.contracts) && !_.isNil(contractResult) ? contractResult : [];

            const onRowSelect = ({ id }, isSelected) => {
                ProvideActions.checkBoxAdminContract({ id: id }, isSelected)

                };

            const selectRowProp = {
              mode: 'checkbox',
              clickToSelect: true,  // enable click to select
              onSelect: onRowSelect
            };

            const optionsTable = {
                sizePerPageList: [ 5, 10, 15, 20 ],
                 sizePerPage: 5,
                 sortName: 'id',
                 sortOrder: 'desc',
                 noDataText: 'Pas de contrat'
            };

            const contractTable = nbContract > 0 ? (
                <BootstrapTable data={ contracts } striped={true} hover={true} pagination={ true }
                    selectRow={ selectRowProp } options={ optionsTable }>
                    <TableHeaderColumn dataField="id" hidden isKey={true} dataAlign="center" dataSort={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="nameCompany" dataAlign="center" dataSort={true}>Nom de la société</TableHeaderColumn>
                    <TableHeaderColumn dataField="creationDate" dataSort={true}>Date de création</TableHeaderColumn>
                </BootstrapTable>
            ) : null;

            return (
                <Panel header={headder} eventKey={index} className="panelFaq">
                    { contractTable }
                </Panel>
            );
        }, this);

        return (
            <Grid fluid>
                <Row className='space-top-bottom'>
                    <Col lg={12}>
                        <OverlayTrigger placement="right" overlay={rightTooltip}>
                           <Button onClick={this._openPopup.bind('CHANGE')} bsStyle='primary' className='floatRight'>
                               <Glyphicon glyph='pencil'></Glyphicon>
                           </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={blockTooltip}>
                            <Button onClick={this._blockContract} bsStyle='danger' className='floatRight marginRight5'>
                                <Glyphicon glyph='ban-circle'></Glyphicon>
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={rappelTooltip}>
                            <Button onClick={this._rappelContract} bsStyle='warning' className='floatRight marginRight5'>
                                <Glyphicon glyph='repeat'></Glyphicon>
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
                <PanelGroup defaultActiveKey="1" accordion className="toggle-carret">
                    { panelContracts }
                </PanelGroup>

                    <ConfirmStatusPopup showModal={this.state.openChangeStatus} title="Changement statut"
                        message="Vous êtes sur le point de modifier le status des contrats"
                        contractStatus={this.props.contractStatus}
                        contract={this.props.adminContractSelected}
                        closeModal={ this._closePreteurPopup }
                        buttonConfirmMessage="Soumettre" callback={this._changeContractStatus} />
            </Grid>
        );
    }
}

ContractsStatusAdmin.contextTypes = {
    contracts: React.PropTypes.array.isRequired,
    contractStatus: React.PropTypes.array.isRequired,
    changeContractStatus: React.PropTypes.func.isRequired,
    blockContract: React.PropTypes.func.isRequired,
    rappelContract: React.PropTypes.func.isRequired
};


export default ContractsStatusAdmin;
