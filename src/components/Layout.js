import React, { Component } from 'react';
import { Link } from 'react-router';
import {Grid,  Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap';
import Scrollchor from 'react-scrollchor';
import Footer from './Footer';

import _ from 'lodash';
import Toastr from 'toastr';


export default class Layout extends Component {
    constructor(props) {
        super(props);
      }

    componentDidMount() {
    }

    _onStateChange() {
    }

    componentWillUnmount() {
    }

    render() {
      let about;
      if (_.isEqual(this.props.location.pathname, '/')) {
        about =  ( <li><Scrollchor to="#about" className="nav-link" animate={{offset: 20, duration: 600}}>À propos de nous</Scrollchor></li>) ;
      };

        return (
          <Grid id='mainLayout' fluid>
            <Row>
              <Navbar fixedTop fluid className="">
                  <Grid>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <Link to="/"><img width="" src="/img/logo.png"></img></Link>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                     <Nav pullRight>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/explorer">Explorer</Link></li>
                        <li><Link to="/simulateur">Simulateur</Link></li>
                        {about}
                        <li><Link to="/faq">Questions</Link></li>
                        <li><Scrollchor to="#contact" className="nav-link" animate={{offset: 20, duration: 600}}>Contact</Scrollchor></li>
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
