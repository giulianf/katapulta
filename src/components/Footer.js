var React = require('react');
import { Grid, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';

export default class Footer extends React.Component {
  constructor (){
    super();
  }

  render () {

    return (
      <footer className="footer section-padding">
        <Grid fluid>
          <Row>
            <Col md={12} sm={12} xs={12} className="text-center" >
              <div className="footer_content">
                <div className="col-sm-2 center-block"><Link to="/"><img src="assets/img/logo.png" alt="" /></Link></div>
                <div className="footer_social">
                  <ul>
                    <li><a className="f_facebook  wow bounceInDown" href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a className="f_twitter wow bounceInDown" data-wow-delay=".1s" href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a className="f_google wow bounceInDown" data-wow-delay=".2s" href="#"><i className="fa fa-google-plus"></i></a></li>
                    <li><a className="f_linkedin wow bounceInDown" data-wow-delay=".3s" href="#"><i className="fa fa-linkedin"></i></a></li>
                    <li><a className="f_youtube wow bounceInDown" data-wow-delay=".4s" href="#"><i className="fa fa-youtube"></i></a></li>
                    <li><a className="f_skype wow bounceInDown" data-wow-delay=".5s" href="#"><i className="fa fa-skype"></i></a></li>
                  </ul>
                </div>
                <p>Ratio &copy; 2016 All Rights Reserved.</p>
              </div>

            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}
