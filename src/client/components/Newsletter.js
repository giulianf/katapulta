import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import Validator from '../../validator/validatorEmprunteurBasic';
import ProvideActions from '../actions/ProvideActions';

export default class Newsletter extends Component {
  constructor (){
    super();
    this.state = { emailNews :''};
  }

  _onClickNewsLetter() {
      if ( Validator.validateEmailAddress(this.state.emailNews ) ) {
          ProvideActions.registerNewsLetter(this.state.emailNews);
      }
  }

  render () {
      const validateEmail = Validator.validateEmailAddress( this.state.emailNews ) ? "success" : "error";

    return (
        <Grid fluid>
        <Row className='newsletter' >

    			<div className="newsletter_overlay section-padding">
    				<Grid>
    					<Row>
                <Col md={7} sm={12} xs={12} mdOffset={2} className='text-center' >
    							<div className="signup_form">
    								<h3>Vous souhaitez rester informez</h3>
    								<form method="post" name="mc-news-subscribe-form" className="validate" target="_blank" novalidate>
                                        <FormGroup controlId="formHorizontalNewsEmail" validationState={validateEmail}>
                                          <Col sm={12} md={8}>
                                            <FormControl type="email" placeholder="email"
                                                onChange={e=>{ this,setState({emailNews: e.target.value})}}
                                                 value={this.state.emailNews}/>
                                          </Col>
                                        </FormGroup>
    									<span><Button onClick={this._onClickNewsLetter.bind()}>Subscribe</Button></span>
    								</form>
    							</div>
    						</Col>
    					</Row>
    				</Grid>
            </div>
    		</Row>
		</Grid>
    );
  }
}
