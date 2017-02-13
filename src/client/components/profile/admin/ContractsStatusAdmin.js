import React, { Component } from 'react';
import { Grid, Modal, Form, Row, Col, PanelGroup, Panel, Button, Glyphicon , Tooltip, OverlayTrigger} from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { getStatusDetail } from '../../../../common/Utility';
import ProvideActions from '../../../actions/ProvideActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ConfirmStatusPopup from './ConfirmStatusPopup';
import Toastr from 'toastr';

class ContractsStatusAdmin extends Component {
  constructor (props){
    super(props);

    this._changeContractStatus = this._changeContractStatus.bind(this);
    this._blockContract = this._blockContract.bind(this);
    this._rappelContract = this._rappelContract.bind(this);
    this._closeStatusPopup = this._closeStatusPopup.bind(this);
    // this._openPopup = this._openPopup.bind(this);

    this.state = { openChangeStatus : false, openBlockStatus: false, openRappelStatus: false};

  }

  _closeStatusPopup() {
        this.setState({ openChangeStatus : false, openBlockStatus: false, openRappelStatus: false });
  }

  _openPopup(action) {
      if (!_.isEmpty(this.props.adminContractSelected)) {
          if (_.isEqual(action, 'CHANGE')) {
              this.setState({openChangeStatus: true});
          } else if (_.isEqual(action, 'BLOCK')) {
              this.setState({openBlockStatus: true});
          } else if (_.isEqual(action, 'RAPPEL')) {
              this.setState({openRappelStatus: true});
          }
      } else {
          Toastr.error("Selectionnez au moins un contrat.");
      }
  }

  _changeContractStatus(status, notifyUser) {
      this.props.changeContractStatus(status, notifyUser);
  }

  _blockContract() {
      this.props.blockContract();
  }

  _rappelContract() {
      this.props.rappelContract();
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

            const onRowSelect = ({ id, nameCompany }, isSelected) => {
                ProvideActions.checkBoxAdminContract({ id: id, nameCompany: nameCompany }, isSelected)
            };

            const onSelectAll = (isSelected, currentDisplayAndSelectedData) => {
                ProvideActions.checkBoxAllAdminContract( isSelected, currentDisplayAndSelectedData );
            };

            const selectId = _.map(this.props.adminContractSelected, contract => {
                return contract.contractId;
            });

            const selectRowProp = {
              mode: 'checkbox',
              clickToSelect: true,  // enable click to select
              onSelect: onRowSelect,
              onSelectAll: onSelectAll,
              selected: selectId  //give a default selected row.
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
                <Panel key={index} header={headder} eventKey={index} className="panelFaq">
                    { contractTable }
                </Panel>
            );
        }, this);

        const showModal = this.state.openChangeStatus || this.state.openBlockStatus || this.state.openRappelStatus ? true : false;
        // set Title
        // Set message
        // set callback function
        let title;
        let message;
        let callback;
        let buttonConfirmMessage;
        let typePopup='NA';
        if ( this.state.openChangeStatus ) {
            title = 'Changer de status' ;
            message = "Vous êtes sur le point de modifier le status des contrats:" ;
            callback = this._changeContractStatus;
            buttonConfirmMessage = "Changer";
            typePopup='CHANGE';
        } else if ( this.state.openBlockStatus ) {
            title = 'Blocker les contrats' ;
            message = "Vous êtes sur le point de bloquer le status des contrats:" ;
            callback = this._blockContract;
            buttonConfirmMessage = "Bloquer";
            typePopup='BLOCK';
        } else if ( this.state.openRappelStatus ) {
            title = 'Rappeler les contrats' ;
            message = "Vous êtes sur le point de rappeler le status des contrats:";
            callback = this._rappelContract;
            buttonConfirmMessage = "Rappel";
            typePopup='RAPPEL';
        }

        return (
            <Grid fluid>
                <Row className='space-top-bottom'>
                    <Col lg={12}>
                        <OverlayTrigger placement="right" overlay={rightTooltip}>
                           <Button onClick={this._openPopup.bind(this, 'CHANGE')} bsStyle='primary' className='floatRight'>
                               <Glyphicon glyph='pencil'></Glyphicon>
                           </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={blockTooltip}>
                            <Button onClick={this._openPopup.bind(this, 'BLOCK')} bsStyle='danger' className='floatRight marginRight5'>
                                <Glyphicon glyph='ban-circle'></Glyphicon>
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={rappelTooltip}>
                            <Button onClick={this._openPopup.bind(this, 'RAPPEL')} bsStyle='warning' className='floatRight marginRight5'>
                                <Glyphicon glyph='repeat'></Glyphicon>
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Row>

                <PanelGroup defaultActiveKey="1" accordion className="toggle-carret">
                    { panelContracts }
                </PanelGroup>

                <ConfirmStatusPopup showModal={ showModal } title={ title }
                    typePopup={typePopup}
                    message={message}
                    contractStatus={this.props.contractStatus}
                    contract={this.props.adminContractSelected}
                    closeModal={ this._closeStatusPopup }
                    buttonConfirmMessage={ buttonConfirmMessage } callback={ callback } />

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
