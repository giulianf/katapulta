import React, { Component } from 'react';
import { Grid, Form, Row, Col, PanelGroup, Panel, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { getStatusDetail } from '../../../../common/Utility';

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
            const nbContract = 0;
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
                    return (
                        <div>{con.creationDate}</div>
                    );
                }
            });

            return (
                <Panel header={headder} eventKey={index} className="panelFaq">
                    test
                </Panel>
            );
        });

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
