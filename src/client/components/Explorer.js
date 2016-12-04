var React = require('react');
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import Emprunteur from './profile/Emprunteur';

export default class Explorer extends React.Component {
  constructor (){
    super();
  }

  render () {
    return (
        <Grid fluid className='marginLeftContainer our_service'>
            <Row className='section section-padding'>
                <div className="c_panel">

                            <div className="c_title">
                                <h2>Search Results Page</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="c_content page-search-results">

                                <div className="search-box">
                                   <form>
                                        <div className="input-group margin-bottom-15">
                                            <input type="text" className="form-control"/>
                                            <span className="input-group-btn">
                                                <button className="btn btn-success" type="button">Search</button>
                                            </span>
                                        </div>

                                   </form>
                                </div>

                                <div className="search-results">

                                    <div className="line-tabs bottom">
                                        <ul className="nav" role="tablist">
                                            <li className="active">
                                                <a href="#all-results" role="tab" data-toggle="tab">Tous <span className="badge badge-success">217</span></a>
                                            </li>
                                            <li>
                                                <a href="#php-results" role="tab" data-toggle="tab">Notre sélection <span className="badge badge-primary">85</span></a>
                                            </li>
                                            <li>
                                                <a href="#css-html-results" role="tab" data-toggle="tab">Les derniers inscrits<span className="badge badge-info">32</span></a>
                                            </li>
                                            <li>
                                                <a href="#javascript-results" role="tab" data-toggle="tab">Javascript <span className="badge badge-warning">76</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">
                                        <div className="tab-pane fade in active" id="all-results">
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Sed cursus ante dapibus diam</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p> Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales.</p>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="php-results">
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Sed cursus ante dapibus diam</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="css-html-results">
                                             <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales.</p>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="javascript-results">
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p> Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                            <div className="search-item">
                                                <h3><a href="javascript:void(0);">Curabitur tortor</a></h3>
                                                <a href="javascript:void(0);" className="search-link">www.google.com</a>
                                                <p>Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <ul className="pagination">
                                            <li className="disabled"><a href="#">«</a></li>
                                            <li><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                            <li><a href="#">»</a></li>
                                        </ul>
                                    </div>




                                </div>

                            </div>

                        </div>
            </Row>
        </Grid>

    );
  }
}
