var React = require('react');
import { Row, Col, PageHeader } from 'react-bootstrap';

export default class Emprunteur extends React.Component {
  constructor (){
    super();
  }

  render () {
    return (
        <div className='container-fluid marginLeftContainer'>
          <Row>
            <Col md={12} >
            <PageHeader className="headerPage">Emprunteur </PageHeader>
            </Col>
          </Row>
        </div>

    );
  }
}
