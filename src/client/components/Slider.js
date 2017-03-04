import React, { Component } from 'react';

import { Row, Col, ButtonToolbar, Carousel, Media} from 'react-bootstrap';
import { Link } from 'react-router';

export default class Slider extends Component {
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
        <Row>
            <Col  xsHidden >
                <Carousel slide={true} indicators={true} activeIndex={this.state.index} direction={this.state.direction} onSelect={handleCarouselSelect.bind(this)}>
                 <Carousel.Item animateIn={true}>
                   <img className="imgCarouselLg"  width={900} height={500} alt="900x500" src="/img/fotolia6.jpg"/>
                   <Carousel.Caption>
                      <Media smHidden xsHidden>
                        <Media.Left align="top">
                          <img src="/img/picto1.png" width="400" alt="Image"/>
                        </Media.Left>
                        <Media.Body className='greenMedia'>
                          <Media.Heading>Preteur - Vous désirez prêter votre argent</Media.Heading>
                          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      </Media.Body>
                      </Media>
                      <ButtonToolbar>
                        <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                      </ButtonToolbar>
                   </Carousel.Caption>
                 </Carousel.Item>
                 <Carousel.Item >
                   <img className="imgCarouselLg" width={900} height={500} alt="900x500" src="/img/fotolia6.jpg"/>
                   <Carousel.Caption>
                     <Media smHidden xsHidden>
                      <Media.Left align="top">
                        <img src="/img/picto2.png" width="400" alt="Image"/>
                      </Media.Left>
                      <Media.Body className='greenMedia'>
                        <Media.Heading>Entrepreneur - Vous avez besoin d'un prêt</Media.Heading>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      </Media.Body>
                    </Media>
                    <ButtonToolbar>
                      <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                   </ButtonToolbar>
                   </Carousel.Caption>
                 </Carousel.Item>
                 <Carousel.Item>
                   <img className="imgCarouselLg" width={900} height={500} alt="900x500" src="/img/fotolia6.png"/>
                   <Carousel.Caption>
                     <Media smHidden xsHidden>
                      <Media.Left align="top">
                        <img src="/img/picto3.jpg" width="400" alt="Image"/>
                      </Media.Left>
                      <Media.Body className='greenMedia'>
                        <Media.Heading>Nous vous aidons</Media.Heading>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      </Media.Body>
                    </Media>
                    <ButtonToolbar>
                      <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                   </ButtonToolbar>
                   </Carousel.Caption>
                 </Carousel.Item>
                </Carousel>
            </Col>
            <Col lgHidden mdHidden smHidden>
                <Carousel slide={true} indicators={true} activeIndex={this.state.index} direction={this.state.direction} onSelect={handleCarouselSelect.bind(this)}>
                 <Carousel.Item animateIn={true}>
                   <img className="imgCarousel"  width={900} height={500} alt="900x500" src="/img/picto1.png"/>
                   <Carousel.Caption>
                      <Media >
                        <Media.Body className='greenMedia'>
                          <Media.Heading>Preteur - Vous désirez prêter votre argent</Media.Heading>
                          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      </Media.Body>
                      </Media>
                      <ButtonToolbar>
                        <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                      </ButtonToolbar>
                   </Carousel.Caption>
                 </Carousel.Item>
                 <Carousel.Item >
                   <img className="imgCarousel" width={900} height={500} alt="900x500" src="/img/picto2.png"/>
                   <Carousel.Caption>
                     <Media smHidden xsHidden>
                      <Media.Body className='greenMedia'>
                        <Media.Heading>Entrepreneur - Vous avez besoin d'un prêt</Media.Heading>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      </Media.Body>
                    </Media>
                    <ButtonToolbar>
                      <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                   </ButtonToolbar>
                   </Carousel.Caption>
                 </Carousel.Item>
                     <Carousel.Item >
                       <img className="imgCarousel" width={900} height={500} alt="900x500" src="/img/picto3.png"/>
                       <Carousel.Caption>
                         <Media>
                          <Media.Body align="top" className='greenMedia'>
                            <Media.Heading>Nous vous aidons</Media.Heading>
                            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                          </Media.Body>
                        </Media>
                        <ButtonToolbar>
                          <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                       </ButtonToolbar>
                       </Carousel.Caption>
                     </Carousel.Item>

                </Carousel>
            </Col>
        </Row>
    );
  }
}
