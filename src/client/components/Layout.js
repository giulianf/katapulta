import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import {Grid,  Row, Col, Navbar, Nav,NavDropdown, NavItem,MenuItem, Button, Glyphicon } from 'react-bootstrap';
import Footer from './Footer';
import Login from './Login';
import LayoutStore from '../stores/LayoutStore';
import LayoutActions from '../actions/LayoutActions';

import _ from 'lodash';


function getLayoutState() {
  return LayoutStore.stateLayout;
}

class Layout extends Component {
    constructor(props, context) {
        super(props);
        this.state = getLayoutState();
        this._onChange = this._onChange.bind(this);
        this.logout = this.logout.bind(this);

      }

    logout() {
       LayoutActions.logUserOut();

       // redirects to login page
       this.context.router.push('/');
     }

    _onChange() {
        this.setState(getLayoutState());
    }

    componentDidMount() {
        LayoutStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        LayoutStore.removeChangeListener(this._onChange);
    }

    render() {
      let connexion;

      if ( !this.state.loggedIn ) {
        connexion =  (
            <Link className="btn btn-flat btn-home-bg" to="/login">Connexion</Link>
        ) ;
    } else {
        connexion =  (
            <NavDropdown eventKey={3} title={<Glyphicon glyph="user" ></Glyphicon>} id="basic-nav-dropdown">
                <Navbar.Text>
                   {this.state.profile ? this.state.profile.name : null}
                 </Navbar.Text>
                <MenuItem divider />
                <li>
                   <Link to="/profile" >Profile</Link>
                </li>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3} onClick={this.logout} >Log Out <Glyphicon glyph="log-out" className="pull-right"></Glyphicon></MenuItem>
            </NavDropdown>
        ) ;
    }



        return (
          <Grid id='mainLayout' fluid>
            <Row>
              <Navbar fixedTop fluid className="">
                  <Grid>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <Link to="/"><img width="100" src="/img/logo.png"></img></Link>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                     <Nav pullRight>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/explorer">Explorer</Link></li>
                        <li><Link to="/simulateur">Simulateur</Link></li>
                        <li><Link to="/faq">Questions</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li>
                            <Navbar.Form>
                                {connexion}
                            </Navbar.Form>
                        </li>

                     </Nav>
                   </Navbar.Collapse>
                 </Grid>
               </Navbar>
          </Row>
          <Row className="layout-content">
                    {/* this is the important part */}
                    {this.props.children}
              </Row>
              <Row>
              <Footer />
              </Row>
          </Grid>
        );
    }
}

Layout.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default withRouter(Layout);
