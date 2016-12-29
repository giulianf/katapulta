import React, { Component } from 'react';

import {  ButtonToolbar, Carousel, Media} from 'react-bootstrap';
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
        <Carousel slide={true} indicators={true} activeIndex={this.state.index} direction={this.state.direction} onSelect={handleCarouselSelect.bind(this)}>
         <Carousel.Item animateIn={true}>
           <img className="imgCarousel"  width={900} height={500} alt="900x500" src="/img/fotolia2.jpg"/>
           <Carousel.Caption>
              <Media smHidden xsHidden>
                <Media.Left align="top">
                  <img src="http://placehold.it/400x320" alt="Image"/>
                </Media.Left>
                <Media.Body className='greenMedia'>
                  <Media.Heading>Preteur - Vous désirez prêter votre argent</Media.Heading>
                  <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
              </Media.Body>
              </Media>
              <ButtonToolbar>
                <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
                <Link to="/preteur" className="cd-btn btn-home-border">Détails</Link>
              </ButtonToolbar>
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img className="imgCarousel" width={900} height={500} alt="900x500" src="/img/fotolia6.jpg"/>
           <Carousel.Caption>
             <Media smHidden xsHidden>
              <Media.Left align="top">
                <img src="http://placehold.it/400x320" alt="Image"/>
              </Media.Left>
              <Media.Body className='greenMedia'>
                <Media.Heading>Entrepreneur - Vous avez besoin d'un prêt</Media.Heading>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
              </Media.Body>
            </Media>
            <ButtonToolbar>
              <Link to="/login" className="cd-btn btn-home-bg home-bg">Connexion</Link>
              <Link to="/emprunteur" className="cd-btn btn-home-border">Détails</Link>
           </ButtonToolbar>
           </Carousel.Caption>
         </Carousel.Item>
        </Carousel>

    );
  }
}
