var React = require('react');
import { Grid, Row, Col , Button} from 'react-bootstrap';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';

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

/*
<Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={handleCarouselSelect.bind(this)}>
   <Carousel.Item>
     <img width={900} height={500} alt="900x500" src="http://placehold.it/900x500"/>
     <Carousel.Caption>
       <h3>First slide label</h3>
       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
     </Carousel.Caption>
   </Carousel.Item>
   <Carousel.Item>
     <img width={900} height={500} alt="900x500" src="http://placehold.it/900x500"/>
     <Carousel.Caption>
       <h3>Second slide label</h3>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
     </Carousel.Caption>
   </Carousel.Item>
   <Carousel.Item>
     <img width={900} height={500} alt="900x500" src="http://placehold.it/900x500"/>
     <Carousel.Caption>
       <h3>Third slide label</h3>
       <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
     </Carousel.Caption>
   </Carousel.Item>
 </Carousel>
 */
    return (
      <div className="cd-hero" id="home">
<ul className="cd-hero-slider autoplay">
  <li className="selected">
    <div className="slider-image">
      <img src="http://placehold.it/900x500"/>
    </div>


    <div className="cd-full-width">
      <h2>Creative - Clean - Responsive</h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
      <Link to="/register" className="cd-btn btn-home-bg">S'enregistrer</Link>

      <a href="" className="cd-btn btn-home-bg">Start With US</a>
    </div>

  </li>

  <li>
    <div className="slider-image">
      <img src="http://placehold.it/900x500"/>
    </div>

    <div className="cd-half-width text-left">
      <h2>Start Your Business </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consequatur cumque natus!</p>

      <a href="#0" className="cd-btn btn-home-border">Purchase Now</a>
    </div>


    <div className="cd-half-width cd-img-container">
      <img src="http://placehold.it/900x500" alt="tech 1"/>
    </div>


  </li>

  <li>
    <div className="slider-image">
      <img src="http://placehold.it/600x500"/>
    </div>


    <div className="cd-half-width cd-img-container">
      <img src="http://placehold.it/700x500" alt="tech 2"/>
    </div>

    <div className="cd-half-width text-left">
      <h2>Join With US</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consequatur cumque natus!</p>
      <a href="#0" className="cd-btn btn-home-bg">Start With US</a>
      <a href="#0" className="cd-btn btn-home-border">Purchase Now</a>
    </div>

  </li>

  <li className="cd-bg-video">

    <div className="cd-full-width">
      <h2>Video Background</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, explicabo.</p>
      <a href="#0" className="cd-btn btn-home-bg">Start With US</a>
    </div>

    <div className="slider-image"></div>
      <div className="cd-bg-video-wrapper" data-video="assets/img/slider/video/video">
      </div>


  </li>

</ul>

<div className="cd-slider-nav">
  <nav>
    <span className="cd-marker item-1"></span>

    <ul>
      <li className="selected"><a href="#0"><i className="fa fa-home"></i>Intro</a></li>
      <li><a href="#0"><i className="fa fa-briefcase"></i>Business</a></li>
      <li><a href="#0"><i className="fa fa-globe"></i>Connect</a></li>
      <li><a href="#0"><i className="fa fa-video-camera"></i>Video</a></li>
    </ul>
  </nav>
</div>
</div>

    );
  }
}
