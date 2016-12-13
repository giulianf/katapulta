import React, { Component, PropTypes } from 'react';
import {Grid,  Row, Col, Tabs, Tab, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { browserHistory } from 'react-router'
import LayoutStore from '../stores/LayoutStore';

import _ from 'lodash';


function getLayoutState() {
  return LayoutStore.state;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = getLayoutState();

        this._login = this._login.bind(this);
    }

    _login() {
        // on form submit, sends the credentials to auth0 api
        this.state.auth.login({
          connection: 'Username-Password-Authentication',
          responseType: 'token',
          email: this.state.user.username,
          password: this.state.user.pass
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

    _handleProfile(key, e) {
        let userUpdated = this.state.user;
        userUpdated[key]= e.target.value;

        this.setState({user : userUpdated });

        // this.setState({user { username: e.target.value } });
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


export default Login;
