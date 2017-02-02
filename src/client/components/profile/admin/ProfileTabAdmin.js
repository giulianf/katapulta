import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, Tabs, Tab, Checkbox } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideActions from '../../../actions/ProvideActions';
var DatePicker = require("react-bootstrap-date-picker");
import { validateEmail } from '../../../../common/Utility';
import ContractsStatusAdmin from './ContractsStatusAdmin';
import statusPreteur from '../../../../data/statusPreteur';
import statusEmprunteur from '../../../../data/statusEmprunteur';

class ProfileTabAdmin extends Component {
    constructor (props){
        super(props);

        this._handleSelect = this._handleSelect.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _handleSelect(key) {
        // 2 : contract preteur
        if ( _.isEqual(key, 1) && _.isEmpty(this.props.adminEmprunteur.contracts) ) {
            // ProvideActions.getAdminContractEmprunteur(this.state.profile);
        } else if ( _.isEqual(key, 2) && _.isEmpty(this.props.adminPreteur.contracts) ) {
            // ProvideActions.getAdminContractPreteur(this.state.profile);
        }
    }

    render () {

        return (
            <Grid >
                <Row>
                    <Col lg={10} md={10} >
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-admin" onSelect={this._handleSelect} className="adminClass">
                            <Tab eventKey={1} title="Emprunteurs" >
                                <ContractsStatusAdmin contractStatus={statusEmprunteur} contracts={ this.props.adminEmprunteur.contracts } />
                            </Tab>
                            <Tab eventKey={2} title="Preteur">
                                <ContractsStatusAdmin contractStatus={statusPreteur} contracts={ this.props.adminPreteur.contracts } />   
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ProfileTabAdmin.contextTypes = {
    adminEmprunteur: React.PropTypes.object.isRequired,
    adminPreteur: React.PropTypes.object.isRequired
};


export default ProfileTabAdmin;
