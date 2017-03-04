import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, Tabs, Tab, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
        this._changeStatusEmprunteur = this._changeStatusEmprunteur.bind(this);
        this._blockStatusEmprunteur = this._blockStatusEmprunteur.bind(this);
        this._rappelStatusEmprunteur = this._rappelStatusEmprunteur.bind(this);
        this._changeStatusPreteur = this._changeStatusPreteur.bind(this);
        this._blockStatusPreteur = this._blockStatusPreteur.bind(this);
        this._rappelStatusPreteur = this._rappelStatusPreteur.bind(this);
    }

    _changeStatusEmprunteur(status, notifyUser) {
        this.props.changeStatus(status, notifyUser, true);
    }

    _blockStatusEmprunteur() {
        this.props.blockStatus(true);
    }

    _rappelStatusEmprunteur() {
        this.props.rappelStatus(true);
    }

    _changeStatusPreteur() {
        this.props.changeStatus(status, notifyUser, false);
    }

    _blockStatusPreteur() {
        this.props.blockStatus(false);
    }

    _rappelStatusPreteur() {
        this.props.rappelStatus(false);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _handleSelect(key) {
        // 2 : contract preteur
        if ( _.isEqual(key, 1) ) {
            ProvideActions.refreshAdmin();
        } else if ( _.isEqual(key, 2) ) {
            ProvideActions.refreshAdmin();
        }
    }

    render () {
        if (_.isEmpty(this.props.adminEmprunteur.contracts )) {
            return null;
        }

        return (
            <Grid >
                <Row>
                    <Col lg={10} md={10} >

                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-admin" onSelect={this._handleSelect} className="adminClass">
                            <Tab eventKey={1} title="Emprunteurs" >
                                <ContractsStatusAdmin adminContractSelected={this.props.adminContractSelected}
                                    changeContractStatus={this._changeStatusEmprunteur}
                                    blockContract={this._blockStatusEmprunteur}
                                    rappelContract={this._rappelStatusEmprunteur}
                                    contractStatus={statusEmprunteur} contracts={ this.props.adminEmprunteur.contracts } />
                            </Tab>
                            <Tab eventKey={2} title="Preteur">
                                <ContractsStatusAdmin  adminContractSelected={this.props.adminContractSelected}
                                    changeContractStatus={this._changeStatusPreteur}
                                    blockContract={this._blockStatusPreteur}
                                    rappelContract={this._rappelStatusPreteur}
                                    contractStatus={statusPreteur} contracts={ this.props.adminPreteur.contracts } />
                            </Tab>
                        </Tabs>

                    </Col>
                </Row>
            </Grid>
        );
    }
}

ProfileTabAdmin.contextTypes = {
    adminContractSelected: React.PropTypes.array.isRequired,
    adminEmprunteur: React.PropTypes.object.isRequired,
    adminPreteur: React.PropTypes.object.isRequired,
    changeStatus: React.PropTypes.func.isRequired,
    blockStatus: React.PropTypes.func.isRequired,
    rappelStatus: React.PropTypes.func.isRequired
};


export default ProfileTabAdmin;
