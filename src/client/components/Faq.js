var React = require('react');
import { Grid, Row, Col, PageHeader, Accordion , Panel } from 'react-bootstrap';

export default class Faq extends React.Component {
  constructor (){
    super();
  }

  render () {
    return (
            <Grid fluid>
              <Row className='section section-padding section-emprunteur'>
                <div className="section-title text-center">
                  <h2>Questions </h2>
                  <div></div>
                </div>
                    <Grid>
                        <Row className="tab-content">
                              <Col md={12} >
                                  <div className="panel-group toggle-carret" id="accordion2">
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion2" href="#collapseFour" aria-expanded="false" className="collapsed">Responsive HTML5 &amp; CSS3 Theme with 30 Diffrent Demos</a>
                                        </h4>
                                        </div>
                                        <div id="collapseFour" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion2" href="#collapseFive" className="" aria-expanded="true">Well Commented and Structured Code</a>
                                        </h4>
                                        </div>
                                        <div id="collapseFive" className="panel-collapse collapse in" aria-expanded="true">
                                            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion2" href="#collapseSix" className="collapsed" aria-expanded="false">Awesome Different Styles of Slideshows</a>
                                        </h4>
                                        </div>
                                        <div id="collapseSix" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion2" href="#collapseSeven" className="collapsed" aria-expanded="false">Custom BG Patterns, Unlimited Colors and Shortcodes</a>
                                        </h4>
                                        </div>
                                        <div id="collapseSeven" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion2" href="#collapseEight" className="collapsed" aria-expanded="false">Designed for Law and Business Websites with Mega Menu</a>
                                        </h4>
                                        </div>
                                        <div id="collapseEight" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                                        </div>
                                    </div>
                                </div>
                              </Col>
                        </Row>
                    </Grid>

              </Row>
            </Grid>

    );
  }
}
