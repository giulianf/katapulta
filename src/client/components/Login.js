import React, { Component, PropTypes } from 'react';
import {Grid,  Row, Col, Tabs, Tab, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import { browserHistory } from 'react-router'
import LayoutStore from '../stores/LayoutStore';
import { validateEmail } from '../../common/Utility';
import Toastr from 'toastr';

import _ from 'lodash';


function getLayoutState() {
  return LayoutStore.state;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = getLayoutState();

        this._findUsername = this._findUsername.bind(this);
        this._login = this._login.bind(this);
        this._signUp = this._signUp.bind(this);
    }

    _findUsername() {
        if ( this.state.signUser.username ) {
            // Async loads the user profile data
            this.state.auth.getProfile(this.state.token, (error, profile) => {
              if (error) {
                  Toastr.error('Error loading the Profile', error);
              } else {
                  Toastr.info('Error loading the Profile', profile);
              }
          });
        }
    }

    _login() {
        // on form submit, sends the credentials to auth0 api
        this.state.auth.login({
          connection: 'Username-Password-Authentication',
          responseType: 'token',
          email: this.state.user.username,
          password: this.state.user.pass,
          params: {
              state: '/'
            }
        }, function(err) {
          if (err) {
              Toastr.error("Impossible de s'authentifier: " + err.message);
          }
        });
    }

    _signUp() {
        if (!_.isEqual(this.state.signUser.pass, this.state.signUser.confirmPass)) {
            Toastr.error('Les mots de passes doivent être les mêmes!');
        }
        // calls auth0 signup api, sending new account data
        this.state.auth.signup({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            // username: this.state.signUser.username,
            email: this.state.signUser.email,
            password: this.state.signUser.pass,
        }, function(err) {
        if (err) alert("something went wrong: " + err.message);
        });
    }



    _handleProfile(key, e) {
        let userUpdated = this.state.user;
        userUpdated[key]= e.target.value;

        this.setState({user : userUpdated });

        // this.setState({user { username: e.target.value } });
        // this.state.openLoginPopup = false;
    }

    _handleProfileSign(key, e) {
        let userUpdated = this.state.signUser;
        userUpdated[key]= e.target.value;

        this.setState({signUser : userUpdated });

        // this.setState({user { username: e.target.value } });
        // this.state.openLoginPopup = false;
    }


    render() {
        const validateEmailSign = !_.isNil(this.state.signUser.email) && validateEmail(this.state.signUser.email) ? "success" : "error";
        const validatePass = !_.isNil(this.state.signUser.pass) && _.size(this.state.signUser.pass) > 6 ? "success" : "error";
        const validateConfirmPass = !_.isEmpty(this.state.signUser.confirmPass) && _.isEqual(this.state.signUser.pass, this.state.signUser.confirmPass) ? "success" : "error";

        const enableConfirmPass = !_.isEmpty(this.state.signUser.pass) && _.size(this.state.signUser.pass) > 6 ? true : false;
        const enableButton =  !_.isEmpty(this.state.signUser.email) && validateEmail(this.state.signUser.email)
        && !_.isNil(this.state.signUser.pass) && _.size(this.state.signUser.pass) > 6
        && _.isEqual(this.state.signUser.pass, this.state.signUser.confirmPass) ? true : false;

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
                                             onChange={this._handleProfile.bind(this, 'username')}
                                              value={this.state.user.username}/>
                                        </FormGroup>
                                       <FormGroup controlId="formHorizontalPass">
                                          <ControlLabel >Mot de passe</ControlLabel>
                                          <FormControl type="password" placeholder="Mot de passe"
                                              onChange={this._handleProfile.bind(this, 'pass')}

                                              value={this.state.user.pass}/>
                                        </FormGroup>
                                     <FormGroup>
                                       <Col smOffset={8} sm={2}>
                                           <Button bsStyle='primary' onClick={this._login}>se connecter</Button>
                                       </Col>
                                     </FormGroup>
                                 </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey={2} title="S'inscrire">
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalsignEmail" validationState={validateEmailSign}>
                                       <ControlLabel >Adresse Email</ControlLabel>
                                       <FormControl type="text" placeholder="Entrez votre adresse email"
                                          onChange={this._handleProfileSign.bind(this, 'email')}
                                           value={this.state.signUser.email}/>
                                     </FormGroup>
                                    <FormGroup controlId="formHorizontalsignPass" validationState={ validatePass }>
                                       <ControlLabel>Mot de passe</ControlLabel>
                                       <FormControl type="password" placeholder="Mot de passe"
                                           onChange={this._handleProfileSign.bind(this, 'pass')}

                                           value={this.state.signUser.pass}/>
                                     </FormGroup>
                                    <FormGroup controlId="formHorizontalsignconfPass" validationState={validateConfirmPass}>
                                       <ControlLabel>Confirmer votre mot de passe</ControlLabel>
                                       <FormControl type="password" placeholder="Mot de passe"
                                           disabled={!enableConfirmPass}
                                           onChange={this._handleProfileSign.bind(this, 'confirmPass')}
                                           value={this.state.signUser.confirmPass}/>
                                       <HelpBlock>Insérez le même mot de passe.</HelpBlock>
                                     </FormGroup>
                                  <FormGroup>
                                    <Col smOffset={8} sm={2}>
                                        <Button bsStyle='primary' onClick={this._signUp} disabled={!enableButton}>s'enregistrer</Button>
                                    </Col>
                                  </FormGroup>
                              </Form>
                            </Tab.Pane>
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Login;
