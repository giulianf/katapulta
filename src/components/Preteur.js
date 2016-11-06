var React = require('react');
import { Row, Col, PageHeader } from 'react-bootstrap';

export default class Preteur extends React.Component {
  constructor (){
    super();
  }

  render () {
    return (
        <div className='container-fluid marginLeftContainer'>
          <Row>
            <Col md={12} >
            <PageHeader className="headerPage">Preteur </PageHeader>
            </Col>
          </Row>
        </div>

    );
  }
}
