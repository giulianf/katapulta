import React, { Component } from 'react';
import { Grid, Row, Col , ButtonToolbar, Button, Carousel, Media} from 'react-bootstrap';
import _ from 'lodash';

export default class OurService extends Component {
  constructor (){
    super();
    this.state = {index: 0, direction: null};
  }

  render () {
    return (
        <Grid fluid>
          <Row className='section section-padding our_service'>
            <div className="section-title text-center">
        			<h2 id='whyus'>Notre <span>service</span></h2>
        			<div></div>
        		</div>
        		  <div id="why_choose">
        				<Row>
        					<Col  md={4} sm={4} xs={12}>
                    <div className="single_service">
        							<i className="fa fa-circle-o-notch"></i>
        							<h4>Consultancy</h4>
        							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante vel aliquet</p>
        						</div>
        					</Col>
        					<Col  md={4} sm={4} xs={12}>
                    <div className="single_service">
                      <i className="fa fa-keyboard-o"></i>
        							<h4>Consultancy</h4>
        							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante vel aliquet</p>
        						</div>
        					</Col>
        					<Col  md={4} sm={4} xs={12}>
                    <div className="single_service">
                      <i className="fa fa-bullhorn"></i>
        							<h4>Consultancy</h4>
        							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante vel aliquet</p>
        						</div>
        					</Col>
        					<Col  md={4} sm={4} xs={12}>
                    <div className="single_service">
                      <i className="fa fa-life-bouy"></i>
        							<h4>Consultancy</h4>
        							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante vel aliquet</p>
        						</div>
        					</Col>
        					<Col  md={4} sm={4} xs={12}>
                    <div className="single_service">
                      <i className="fa fa-briefcase"></i>
        							<h4>Consultancy</h4>
        							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante vel aliquet</p>
        						</div>
        					</Col>
        					<Col  md={4} sm={4} xs={12}>
                    <div className="single_service">
                      <i className="fa fa-camera-retro"></i>
        							<h4>Consultancy</h4>
        							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante vel aliquet</p>
        						</div>
        					</Col>

        			  </Row>
        		  </div>
          </Row>
        </Grid>
    );
  }
}
