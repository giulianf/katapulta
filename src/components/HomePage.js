var React = require('react');
import { Grid, Row, Col , ButtonToolbar, Button, Carousel, Media} from 'react-bootstrap';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';
import _ from 'lodash';
import Footer from 'footer';

export default class HomePage extends React.Component {
  constructor (){
    super();
    this.state = {index: 0, direction: null};
  }

  render () {
    const handleCarouselSelect = (selectedIndex, e) => {
     this.setState({
       index: selectedIndex,
       direction: e.direction
     });
   };


    return (
      <Grid fluid>
        <Carousel slide={true} indicators={true} activeIndex={this.state.index} direction={this.state.direction} onSelect={handleCarouselSelect.bind(this)}>
         <Carousel.Item animateIn={true}>
           <img className="imgCarousel" height={500} alt="900x500" src="/img/fotolia.jpg"/>
           <Carousel.Caption>
              <Media>
                <Media.Left align="top">
                  <img src="http://placehold.it/400x320" alt="Image"/>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>Vous désirez prêter votre argent</Media.Heading>
                  <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>

                  <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                </Media.Body>
              </Media>
              <ButtonToolbar>
                <Link to="/register" className="cd-btn btn-home-bg">S'enregistrer</Link>
                <Link to="/preteur" className="cd-btn btn-home-border">Détails</Link>
              </ButtonToolbar>
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img className="imgCarousel" height={500} alt="900x500" src="/img/fotolia.jpg"/>
           <Carousel.Caption>
             <Media>
              <Media.Left align="top">
                <img src="http://placehold.it/400x320" alt="Image"/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Vous avez besoin d'un prêt</Media.Heading>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>

                <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </Media.Body>
            </Media>
            <ButtonToolbar>
              <Link to="/register" className="cd-btn btn-home-bg">S'enregistrer</Link>
              <Link to="/emprunteur" className="cd-btn btn-home-border">Détails</Link>
           </ButtonToolbar>
           </Carousel.Caption>
         </Carousel.Item>
        </Carousel>
        <div id='about'></div>
        <Grid fluid>
          <Row className='section'>
        		<div className="section-title text-center">
        			<h2>À propos de <span>nous</span></h2>
        			<div></div>
        		</div>
        		<Col md={6} sm={6} xs={6} mdOffset={3} xsOffset={3} >
        			<div className="single_about_content">
        				<iframe src="https://player.vimeo.com/video/183058098" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        			</div>
        		</Col>
          </Row>
        </Grid>
        <Grid fluid>
          <Row className='section our_service'>
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

        <Footer />
      </Grid>
    );
  }
}
