import React, { Component, PropTypes } from 'react';
import {Grid,  Row, Col, Tabs, Tab, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import { browserHistory } from 'react-router'
import LayoutStore from '../stores/LayoutStore';
import LayoutActions from '../actions/LayoutActions';
import { validateEmail , validatePassword } from '../../common/Utility';
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
        this._showForgetPwd = this._showForgetPwd.bind(this);
        this._forgetPass = this._forgetPass.bind(this);
        this._login = this._login.bind(this);
        this._signUp = this._signUp.bind(this);
    }

    _showForgetPwd() {
        if (this.state.oublipwd) {
            this.setState({oublipwd: false});
        } else {
            this.setState({oublipwd: true});
        }
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
    }

    _handleProfileSign(key, e) {
        let userUpdated = this.state.signUser;
        userUpdated.user_id = this.state.userId;
        userUpdated[key]= e.target.value;

        this.setState({signUser : userUpdated });
    }

    _handleForgotPass(key, e) {
        let userUpdated = this.state.passForget;
        userUpdated[key]= e.target.value;

        this.setState({passForget : userUpdated });
    }


    _forgetPass() {
        // on form submit, sends the credentials to auth0 api
        this.state.auth.changePassword({
          connection: 'Username-Password-Authentication',
          responseType: 'token',
          email: this.state.passForget.username,
          password: this.state.passForget.passConfirm,
          params: {
              state: '/'
            }
        }, function(err) {
          if (err) {
              Toastr.error("Impossible de changer de mot de passe: " + err.message);
          }
        });
        // LayoutActions.forgetUser(this.state.passForget, this.state.token);
    }

    render() {
        const validateEmailSign = validateEmail(this.state.signUser.email) ? "success" : "error";
        const validatePass = validatePassword(this.state.signUser.username, this.state.signUser.pass) ? "success" : "error";
        const validateConfirmPassBoolean= validatePassword(this.state.signUser.username, this.state.signUser.pass)
        && _.isEqual(this.state.signUser.pass, this.state.signUser.confirmPass) ? true : false;
        const validateConfirmPass = validateConfirmPassBoolean ? "success" : "error";
        const enableConfirmPass = !_.isEmpty(this.state.signUser.pass) && validateConfirmPassBoolean ? true : false;

        const enableButton = validateEmail(this.state.signUser.email) && validateConfirmPassBoolean? true : false;

        const validPassForgetBoolean = validatePassword(this.state.passForget.username, this.state.passForget.pass) ? true : false;
        const validConfirmPassForget = validPassForgetBoolean && _.isEqual(this.state.passForget.pass, this.state.passForget.passConfirm) ? true:false;
        const validateEmailForget = validateEmail(this.state.passForget.username) ?true:false;

        // const enableSoumettre = validateEmailForget && validConfirmPassForget ? true : false;
        const enableSoumettre = true;
        return (
            <Grid >
                <Row className='section section-padding'>
                    <Col md={4} sm={8} xs={12} mdOffset={4} smOffset={4} >
                        <Tabs className="login" defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab.Pane className='test' eventKey={1} title="Connexion">

                                { !this.state.oublipwd ? (
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
                                        <FormGroup controlId="formHorizontalPassoubli">
                                            <a href="#" onClick={this._showForgetPwd}>Mot de passe oublié?</a>
                                        </FormGroup>
                                        <FormGroup>
                                          <Col smOffset={8} sm={2}>
                                              <Button bsStyle='primary' onClick={this._login}>se connecter</Button>
                                          </Col>
                                        </FormGroup>
                                    </Form>
                                ) : (
                                    <Form horizontal>
                                        <FormGroup controlId="formHorizontalEmail">
                                            <ControlLabel >Adresse Email</ControlLabel>
                                            <FormControl type="text" placeholder="Entrez votre adresse email"
                                            onChange={this._handleForgotPass.bind(this, 'username')}
                                            value={this.state.passForget.username}/>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalNewPass">
                                            <ControlLabel >Nouveau Mot de passe</ControlLabel>
                                            <FormControl type="password" placeholder="Nouveau Mot de passe"
                                            onChange={this._handleForgotPass.bind(this, 'pass')}
                                            value={this.state.passForget.pass}/>
                                        <HelpBlock>Le mot de passe doit contenir au moins 7 caractères, incluant majuscule, minuscule et nombre</HelpBlock>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalNewPassConfirm">
                                            <ControlLabel >Confirmer nouveau Mot de passe</ControlLabel>
                                            <FormControl type="password" placeholder="Confirmer Mot de passe"
                                            onChange={this._handleForgotPass.bind(this, 'passConfirm')}
                                            value={this.state.passForget.passConfirm}/>
                                        <HelpBlock>Insérez le même mot de passe.</HelpBlock>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalBack" >
                                            <a href="#" className="pull-right" onClick={this._showForgetPwd}>Retour</a>
                                        </FormGroup>
                                        <FormGroup>
                                          <Col smOffset={8} sm={2}>
                                              <Button bsStyle='primary' disabled={!enableSoumettre} onClick={this._forgetPass}>Soumettre</Button>
                                          </Col>
                                        </FormGroup>
                                    </Form>
                                )}

                            </Tab.Pane>
                            <Tab.Pane eventKey={2} title="S'inscrire">
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalsignEmail" validationState={validateEmailForget}>
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
