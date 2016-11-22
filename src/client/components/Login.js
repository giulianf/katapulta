import React, { Component } from 'react';
import {Grid,  Row, Col, Tabs, Tab, Button} from 'react-bootstrap';
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

import _ from 'lodash';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this._login = this._login.bind(this);
        this._register = this._register.bind(this);
    }

    _login() {
        // close the popup
        // this.setState({openLoginPopup: false});

        // action to login
        // this.state.openLoginPopup = false;

        // forward to account
        this.props.history.push('/profile');
    }

    _register() {
        // this.state.openLoginPopup = false;
    }


    render() {
        return (
            <Grid >
                <Row className='section section-padding'>
                    <Col md={4} sm={4} xs={12} mdOffset={4} >
                        <Tabs className="login" defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab.Pane className='test' eventKey={1} title="Connexion">
                               <Grid>
                                   <Row>
                                       Login
                                   </Row>
                                   <Row>
                                       <Button onClick={this._login}>se connecter</Button>
                                   </Row>
                               </Grid>
                            </Tab.Pane>
                            <Tab.Pane eventKey={2} title="S'inscrire">
                               <Grid>
                                   <Row>
                                       Register
                                   </Row>
                                   <Row>
                                       <Button onClick={this._register}>s'inscrire</Button>
                                   </Row>
                               </Grid>
                            </Tab.Pane>
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
