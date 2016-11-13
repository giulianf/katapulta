import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export default class Newsletter extends Component {
  constructor (){
    super();
  }

  render () {

    return (
        <Grid fluid>
        <Row className='newsletter' >

    			<div className="newsletter_overlay section-padding">
    				<Grid>
    					<Row>
                <Col md={7} sm={12} xs={12} mdOffset={2} className='text-center' >
    							<div className="signup_form">
    								<h3>Vous souhaitez rester informez</h3>
    								<form action="http://site90.us11.list-manage.com/subscribe/post?u=599a2153f4b86cb2f92d4af3a&amp;id=26d7c26287" method="post" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
    									<input type="email" name="EMAIL" className="form-control" id="mce-email" placeholder="Enter Email"/>
    									<span><Button>Subscribe</Button></span>
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
