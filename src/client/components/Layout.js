import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import {Grid,  Row, Col, Navbar, Nav,NavDropdown, NavItem,MenuItem, Button, Glyphicon } from 'react-bootstrap';
import Scrollchor from 'react-scrollchor';
import Footer from './Footer';
import Login from './Login';
import LayoutStore from '../stores/LayoutStore';
import LayoutActions from '../actions/LayoutActions';

import _ from 'lodash';


function getLayoutState() {
  return LayoutStore.state;
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = getLayoutState();
        this._onChange = this._onChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

      }

    login() {
        // We can call the show method from Auth0Lock,
        // which is passed down as a prop, to allow
        // the user to log in
        // this.state.lock.show((err, profile, token) => {
        //  if (err) {
        //    alert(err);
        //    return;
        //  }
        if ( this.state.loggedIn ) {
            // authenticated
            this.props.history.push('/profile');
        } else {
            // not authenticated
            this.props.history.push('/login');
        }
        //  LayoutActions.logUserIn(profile, token);
         //
        //  this.setState({authenticated: true});
    }

    logout() {
       LayoutActions.logUserOut();

       this.props.history.push('/');
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
      let about;
      let connexion;

      if (_.isEqual(this.props.location.pathname, '/')) {
        about =  ( <li><Scrollchor to="#about" className="nav-link" animate={{offset: 20, duration: 600}}>À propos de nous</Scrollchor></li>) ;
      };

      if ( !this.state.loggedIn ) {
        connexion =  (<li className='leftConnectButton'><Button onClick={this.login} className="btn-home-bg header">Connexion</Button></li>) ;
    } else {
        connexion =  ( <NavDropdown eventKey={3} title={<Glyphicon glyph="user" >{this.state.user ? this.state.user.username : null}</Glyphicon>}
                        id="basic-nav-dropdown">
                        <li>
                           <Link to="/profile" >Profile</Link>
                       </li>
                          <MenuItem divider />
                          <MenuItem eventKey={3.3} onClick={this.logout} >Log Out <Glyphicon glyph="log-out" className="pull-right"></Glyphicon></MenuItem>
                        </NavDropdown>) ;
        // connexion =  ( <li className="leftConnectLogged  dropdown">
        //                 <a href="javascript:void(0);" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
        //                     <Glyphicon glyph="user" >{this.state.user ? this.state.user.username : null}</Glyphicon>
        //                     <span className=" fa fa-angle-down"></span>
        //                 </a>
        //                 <ul className="dropdown-menu dropdown-usermenu animated fadeInUp pull-right">
        //                     <li>
        //                         <Link to="/profile" >Profile</Link>
        //                     </li>
        //                     <li>
        //                         <a href="../app-pages/page-profile-settings.html" >
        //                             <span className="badge bg-red pull-right">50%</span>
        //                             <span>Settings</span>
        //                         </a>
        //                     </li>
        //                     <li>
        //                         <a href="javascript:void(0);" >Help</a>
        //                     </li>
        //                     <li><Button onClick={this.logout} ><i className=" icon-login pull-right"></i> Log Out</Button>
        //                     </li>
        //                 </ul>
        //             </li>) ;
    }



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
                        <li><Link to="/contact">Contact</Link></li>
                        {connexion}
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

export default withRouter(Layout);
