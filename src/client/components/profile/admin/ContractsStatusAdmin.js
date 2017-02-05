import React, { Component } from 'react';
import { Grid, Form, Row, Col, PanelGroup, Panel, Button, Table, Checkbox } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { getStatusDetail } from '../../../../common/Utility';
import ProvideActions from '../../../actions/ProvideActions';

class ContractsStatusAdmin extends Component {
  constructor (props){
    super(props);


  }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

    render () {
        if (_.isNil(this.props.contracts)) {
            return null;
        }

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

            const contracts = _.map(this.props.contracts, con => {
                if (_.isEqual(status.label, con.status)) {
                    // if checked
                    const checked = _.find(this.props.adminContractSelected, {id:  con.id }) ? true : false;

                    return (
                        <tr key={con.status}>
                          <td><Checkbox checked={ checked } onChange={e => ProvideActions.checkBoxAdminContract({id: con.id}, checked)} >
                        </Checkbox></td>
                          <td>{con.creationDate}</td>
                          <td>{con.nameCompany}</td>
                        </tr>
                    );
                }
            });

            const contractTable = nbContract > 0 ? (
                <Table striped bordered condensed hover>
                   <thead>
                     <tr>
                       <th>#</th>
                       <th>Date de création</th>
                       <th>Société</th>
                     </tr>
                   </thead>
                   <tbody>
                       {contracts}
                   </tbody>
                 </Table>
            ) : null;

            return (
                <Panel header={headder} eventKey={index} className="panelFaq">
                    { contractTable }
                </Panel>
            );
        }, this);

        return (
            <Grid fluid>
                <PanelGroup defaultActiveKey="1" accordion className="toggle-carret">
                    { panelContracts }
                </PanelGroup>
            </Grid>
        );
    }
}

ContractsStatusAdmin.contextTypes = {
    contracts: React.PropTypes.array.isRequired,
    contractStatus: React.PropTypes.array.isRequired
};


export default ContractsStatusAdmin;
