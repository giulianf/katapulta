var React = require('react');
import { Grid, Row, Col, Pagination, Panel, Form, FormGroup, FormControl ,HelpBlock , InputGroup, Button} from 'react-bootstrap';
import EmprunteurComponent from './profile/EmprunteurComponent';
import ProvideStore from '../stores/ProvideStore';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import zip from '../../data/zipcode-belgium.json';
import categories from '../../data/categories.json';
import ProvideActions from '../actions/ProvideActions';

export default class Explorer extends React.Component {
    constructor () {
        super();
        ProvideActions.getExplorer(ProvideStore.getProfile);

        this._onChange = this._onChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this._handleCode = this._handleCode.bind(this);
        this._handleCategory = this._handleCategory.bind(this);
        this._onUpdateCategory = this._onUpdateCategory.bind(this);
        this.state = ProvideStore.explorerState;
    }

    _onChange() {
        this.setState(ProvideStore.explorerState);
    }

    componentDidMount() {
        ProvideStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ProvideStore.removeChangeListener(this._onChange);
    }

    handleSelect(eventKey) {
     this.setState({
       activePage: eventKey
     });
    }

    _handleCategory(chosenRequest, index) {
        ProvideActions.searchExplorer({category: chosenRequest});
    }

    _handleCode(chosenRequest, index) {
        ProvideActions.searchExplorer({codePostal: chosenRequest});
    }

    _handleSelectExplorer(tabKey) {
        ProvideActions.searchExplorer({tabSelected: tabKey});
    }

    _onUpdateCategory(searchText) {
        // Only update when value is empty
        if (_.isEqual(searchText, '')) {
            ProvideActions.searchExplorer({category: searchText});
        }
    }

    _onEnterSearch() {

    }

    render () {
      const explorer = _.map(this.state.explorer.selectedExplorers , expl => {
          return (
                  <EmprunteurComponent key={expl.emprunteurId} dataSociete={expl} profile={this.state.profile}
                      loggedIn={this.state.loggedIn} colmd={4} col={3} onClickFavori={ProvideActions.favorisEmprunteur}/>
          )
      });
      const dataSource1 = _.map(zip , code => {
          return (
              {
                text: code.zip + ' ' + code.commune,
                value: (
                  <MenuItem
                    primaryText={code.commune}
                    secondaryText={code.zip}
                  />
                ),
              }
          )
      });

    const dataSource3 =  _.sortBy(categories);

    const dataSourceConfig = {
        text: 'zip',
        value: 'commune',
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
                                                   <FormControl type="text" onChange={e => ProvideActions.changeFreeText({freeText: e.target.value})}
                                                       value={this.state.searchCriteria.freeText}
                                                        placeholder="Faites une recherche de la société, d'un lieu ou d'une catégorie" />
                                                       <InputGroup.Button>
                                                         <Button bsStyle="success" onClick={e => ProvideActions.searchExplorer() }>Recherche</Button>
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
                                                      searchText={this.state.searchCriteria.codePostal }
                                                    />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalCategory">
                                              <Col sm={12} md={4}>
                                                  <AutoComplete
                                                      floatingLabelText="Catégories"
                                                      filter={AutoComplete.fuzzyFilter}
                                                      maxSearchResults={25}
                                                      openOnFocus={true}
                                                      dataSource={dataSource3}
                                                      onNewRequest={this._handleCategory}
                                                      fullWidth={true}
                                                      searchText={this.state.searchCriteria.category }
                                                      onUpdateInput={this._onUpdateCategory}
                                                     />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalRecherche">
                                              <Col sm={12} md={4}>
                                                 <Button bsStyle="success" onClick={e => ProvideActions.searchExplorer() }>Recherche</Button>
                                              </Col>
                                            </FormGroup>
                                       </Panel>

                                   </Form>
                                </div>

                                <div className="search-results back-gallery">
                                    <div className="line-tabs bottom">
                                        <ul className="nav" role="tablist">
                                            <li className="active">
                                                <a href="#all" onClick={this._handleSelectExplorer.bind(this, 'all') } role="tab" data-toggle="tab">Tous <span className="badge badge-success">{this.state.nbAll}</span></a>
                                            </li>
                                            <li>
                                                <a href="#ourSelection"  onClick={this._handleSelectExplorer.bind(this, 'ourSelection') } role="tab" data-toggle="tab">Notre sélection <span className="badge badge-primary">{this.state.nbOurSelection}</span></a>
                                            </li>
                                            <li>
                                                <a href="#latest"  onClick={this._handleSelectExplorer.bind(this, 'latest') } role="tab" data-toggle="tab">Les derniers inscrits <span className="badge badge-info">{this.state.nbLatest}</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <Row>
                                    <div className="tab-content">
                                        <div className="tab-pane fade in active" id="all">
                                            { explorer }
                                        </div>

                                    </div>
                                </Row>

                                <Row>
                                    <div className="tab-content">
                                        <Col lg={4} md={4}>
                                            <Pagination
                                              prev
                                              next
                                              first
                                              last
                                              ellipsis
                                              boundaryLinks
                                              items={20}
                                              maxButtons={5}
                                              activePage={this.state.explorer.activePage}
                                              onSelect={this._handleSelect} />
                                        </Col>
                                    </div>
                                </Row>
                                </div>

                            </div>

                        </div>
            </Row>
        </Grid>

    );
    }
}
