var React = require('react');
import { Grid, Row, Col, Pagination, Panel, Form, FormGroup, FormControl ,HelpBlock , InputGroup, Button} from 'react-bootstrap';
import EmprunteurComponent from './profile/EmprunteurComponent';
import ProvideStore from '../stores/ProvideStore';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import zip from '../../data/zipcode-belgium.json';

export default class Explorer extends React.Component {
  constructor (){
    super();

    this.handleSelect = this.handleSelect.bind(this);
    this._handleCode = this._handleCode.bind(this);
    this.state = ProvideStore.getExplorer;
  }

  handleSelect(eventKey) {
     this.setState({
       activePage: eventKey
     });
   }

    _handleCode(chosenRequest, index) {
        alert(chosenRequest.value.props.secondaryText);
    }
  render () {
      const explorer = _.map(this.state.explorer , expl => {
          return (
                  <EmprunteurComponent key={expl.emprunteurId} dataSociete={expl} col={3} />
          )
      });
      const dataSource1 = _.map(zip , code => {
          return (
              {
                text: code.zip + ' ' + code.city,
                value: (
                  <MenuItem
                    primaryText={code.city}
                    secondaryText={code.zip}
                  />
                ),
              }
          )
      });

      const dataSource3 = _.sortBy(['Horeca', 'Services' , 'Construction', 'Technologies']);
    const dataSourceConfig = {
      text: 'zip',
      value: 'city',
    };


    return (
        <Grid fluid className='marginLeftContainer our_service c_panel'>
            <Row className='section section-padding'>
                <div className="">
                    <div className="section-title text-center">
            			<h2>Recherche de <span>sociétés</span></h2>
                    <div></div>
            		</div>

                            <div className="c_content page-search-results">

                                <div className="search-box">
                                   <Form horizontal>
                                         <Col sm={12} md={12}>
                                               <InputGroup>
                                                   <FormControl type="text" placeholder="Faites une recherche de la société, d'un lieu ou d'une catégorie" />
                                                       <InputGroup.Button>
                                                         <Button bsStyle="success">Recherche</Button>
                                                       </InputGroup.Button>
                                               </InputGroup>
                                         </Col>
                                        <a href="#" onClick={ ()=> this.setState({ open: !this.state.open })}>
                                          Recherche avancée
                                      </a>

                                        <Panel collapsible expanded={this.state.open}>
                                            <FormGroup controlId="formHorizontalLieu">
                                              <Col sm={12} md={4}>
                                                  <AutoComplete
                                                      floatingLabelText="Code postale, commune"
                                                      filter={AutoComplete.fuzzyFilter}
                                                      maxSearchResults={10}
                                                      dataSource={dataSource1}
                                                      onNewRequest={this._handleCode}
                                                      fullWidth={true}
                                                    />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalCategory">
                                              <Col sm={12} md={4}>
                                                  <AutoComplete
                                                      floatingLabelText="Catégories"
                                                      filter={AutoComplete.fuzzyFilter}
                                                      maxSearchResults={10}
                                                      openOnFocus={true}
                                                      dataSource={dataSource3}
                                                      onNewRequest={this._handleCode}
                                                      fullWidth={true}
                                                    />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalRecherche">
                                              <Col sm={12} md={4}>
                                                 <Button bsStyle="success">Recherche</Button>
                                              </Col>
                                            </FormGroup>
                                       </Panel>

                                   </Form>
                                </div>

                                <div className="search-results back-gallery">
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
                                    <Row>
                                    <div className="tab-content">
                                        <div className="tab-pane fade in active" id="all-results">

                                            { explorer }
                                        </div>

                                    </div>
                                </Row>

                                <Row>
                                    <Pagination
                                      prev
                                      next
                                      first
                                      last
                                      ellipsis
                                      boundaryLinks
                                      items={20}
                                      maxButtons={5}
                                      activePage={this.state.activePage}
                                      onSelect={this.handleSelect} />
                                </Row>
                                </div>

                            </div>

                        </div>
            </Row>
        </Grid>

    );
  }
}
