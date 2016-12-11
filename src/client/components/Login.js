import React, { Component, PropTypes } from 'react';
import {Grid,  Row, Col, Tabs, Tab, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { browserHistory } from 'react-router'
import AuthService from '../services/AuthService'

import _ from 'lodash';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', pass:''};

        this._login = this._login.bind(this);
        this._register = this._register.bind(this);
    }

    _login() {
        // on form submit, sends the credentials to auth0 api
        this.props.auth.login({
          connection: 'Username-Password-Authentication',
          responseType: 'token',
          email: this.state.username,
          password: this.state.pass
        }, function(err) {
          if (err) alert("something went wrong: " + err.message);
        });
        // close the popup
        // this.setState({openLoginPopup: false});

        // action to login
        // this.state.openLoginPopup = false;

        // forward to account
        // this.props.history.push('/profile');
    }

    _register() {
        // this.state.openLoginPopup = false;
    }


    render() {
        return (
            <Grid >
                <Row className='section section-padding'>
                    <Col md={4} sm={8} xs={12} mdOffset={4} smOffset={4} >
                        <Tabs className="login" defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab.Pane className='test' eventKey={1} title="Connexion">
                                   <Form horizontal>
                                       <FormGroup controlId="formHorizontalEmail">
                                          <ControlLabel >Adresse Email</ControlLabel>
                                          <FormControl type="text" placeholder="Entrez votre adresse email"
                                              onChange={e => {this.setState({username: e.target.value})}}
                                              value={this.state.username}/>
                                        </FormGroup>
                                       <FormGroup controlId="formHorizontalPass">
                                          <ControlLabel >Mot de passe</ControlLabel>
                                          <FormControl type="password" placeholder="Mot de passe"
                                              onChange={e => {this.setState({pass: e.target.value})}}
                                              value={this.state.pass}/>
                                        </FormGroup>
                                     <FormGroup>
                                       <Col smOffset={8} sm={2}>
                                           <Button bsStyle='primary' onClick={this._login}>se connecter</Button>
                                       </Col>
                                     </FormGroup>
                                 </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey={2} title="S'inscrire">
                               <Grid>
                                   <Row>
                                       Register
                                   </Row>
                                   <Row>
                                       <Button type="submit" onClick={this._register}>s'inscrire</Button>
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


Login.propTypes = {
  auth: PropTypes.instanceOf(AuthService)
};

export default Login;
