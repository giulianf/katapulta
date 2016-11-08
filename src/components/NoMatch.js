var React = require('react');
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';

export default class NoMatch extends React.Component {
  constructor (){
    super();
  }

  render () {
    /*    <div className='container-fluid marginLeftContainer'>
          <Row>
            <Col md={12} >
            <PageHeader className="headerPage">Not found Page </PageHeader>
            </Col>
          </Row>
        </div>
        */
    return (
      <Grid fluid>
                  <div className="well">
                      <PageHeader><i className="ace-icon fa fa-sitemap"></i> 404 <small>Page non trouvée</small></PageHeader>

                    <h3 className="lighter smaller">Nous avons cherché partout mais nous ne trouvons rien!</h3>

                    <div>

                      <div className="space"></div>
                      <h4 className="smaller">Essayez ceci:</h4>

                      <ul className="list-unstyled spaced inline bigger-110 margin-15">
                        <li>
                          <i className="ace-icon fa fa-hand-o-right blue"></i>
                          Re-vérifier l'adresse url
                        </li>

                        <li>
                          <i className="ace-icon fa fa-hand-o-right blue"></i>
                          Lire le FAQ
                        </li>

                        <li>
                          <i className="ace-icon fa fa-hand-o-right blue"></i>
                          Dites nous le problème
                        </li>
                      </ul>
                    </div>

                    <hr />
                    <div className="space"></div>

                    <div className="center">
                      <a href="javascript:history.back()" className="btn btn-grey">
                        <i className="ace-icon fa fa-arrow-left"></i>
                        Go Back
                      </a>

                      <Link to="/" ><i className="ace-icon fa fa-tachometer"></i> Page d'accueil</Link>
                    </div>
                  </div>

      </Grid>
    );
  }
}
