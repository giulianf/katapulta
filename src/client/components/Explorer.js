var React = require('react');
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';

export default class Explorer extends React.Component {
  constructor (){
    super();
  }

  render () {
    return (
        <Grid fluid className='marginLeftContainer our_service'>
          <Row className='section section-padding'>
          	<Col md={2}>
          		<div className="widget user-view-style-1">
          		<div className="thumbnail">
                <img  src="http://placehold.it/4133x2745" alt="242x200"/>
          			<div className="user-info">
          				<p className="user-name">John Doe</p>
          				<p className="user-type administrator"><span className="badge">Administrator</span></p>
          			</div>

  			 <div className="caption">

  					<div className="user-task-info">
  						<i className="fa fa-th-large"></i><span className="user-number-tickets">28</span><span className="lbl-user-number-tickets">Assigned Tickets</span>
  					</div>

  					<div className="user-other-info">
  						<ul>
  							<li>
  								<i className="fa fa-circle-o"></i>
  								<span>
  									<a href="#">Web Developer</a>
  								</span>
  							</li>
  							<li>
  								@ <span><a href="#">jdoe@gmail.com</a></span>
  							</li>
  							<li>
  								<i className="icon-earphones"></i> <span>236-3626-312</span>
  							</li>
  						</ul>
  					</div>

  					<div className="user-action">
  						<button type="button" className="btn btn-green btn-flat btn-sm" data-toggle="modal" data-target="#modal-pull-right-view">View <i className="fa fa-eye"></i></button>
  					</div>

  				</div>
  		  </div>

  		</div>

  	</Col>
  </Row>

    <li class="dropdown">
  	<a href="javascript:void(0);" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
  		<img src="../../../assets/images/profile.jpg" alt="image"/>John Doe
  		<span class=" fa fa-angle-down"></span>
  	</a>
  	<ul class="dropdown-menu dropdown-usermenu animated fadeInUp pull-right">
  		<li>
  			<a href="../app-pages/page-profile-dashboard.html" class="hvr-bounce-to-right">  Profile</a>
  		</li>
  		<li>
  			<a href="../app-pages/page-profile-settings.html" class="hvr-bounce-to-right">
  				<span class="badge bg-red pull-right">50%</span>
  				<span>Settings</span>
  			</a>
  		</li>
  		<li>
  			<a href="javascript:void(0);" class="hvr-bounce-to-right">Help</a>
  		</li>
  		<li><a href="../app-pages/page-login-2.html" class="hvr-bounce-to-right"><i class=" icon-login pull-right"></i> Log Out</a>
  		</li>
  	</ul>
  </li>
        </Grid>

    );
  }
}
