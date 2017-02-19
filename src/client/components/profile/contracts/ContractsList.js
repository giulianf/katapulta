import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Button , ResponsiveEmbed} from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import DetailButton from './DetailButton';
import StatusContract from './StatusContract';
import ProgressBarContract from './ProgressBarContract';
import GenerateContract from './GenerateContract';
import VerticalLinearStepper from '../../VerticalLinearStepper';

class ContractsList extends Component {
  constructor (props){
    super(props);

  }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

    render () {
        const verticalLinearVisible = !_.isNil(this.props.tabContracts) && this.props.tabContracts.stepWorkflow.visible ?  (<VerticalLinearStepper list={this.props.statusContract} stepWorkflow={this.props.stepWorkflow} />) : null;
        const contracts = !_.isNil(this.props.tabContracts) && !_.isNil(this.props.tabContracts.contracts) ? this.props.tabContracts.contracts : [];

        const optionsTable = {
            sizePerPageList: [ 5, 10, 15, 20 ],
             sizePerPage: 5,
             sortName: 'id',
             sortOrder: 'desc',
             noDataText: 'Pas de contrat'
        };

        const detailButtonFormat = (cell, row, enumObject, index) => {
            return (
                <DetailButton id={row.id}/>
            );
        };
        const progressFormat = (cell, row, enumObject, index) => {
            return (
                <ProgressBarContract progress={row.progress}/>
            );
        };
        const contratpdfFormat = (cell, row, enumObject, index) => {
            return (
                <GenerateContract id={row.id} wait={this.props.pdf.wait}/>
            );
        };
        return (
            <div key={this.props.keyTab}>
                <Col className='space-top-bottom'>
                    <BootstrapTable data={ contracts } options={ optionsTable } pagination={ true }>
                       <TableHeaderColumn dataField='id' isKey={ true } dataFormat={ detailButtonFormat } >ID</TableHeaderColumn>
                       <TableHeaderColumn dataField='creationDate'>Date de création du contrat</TableHeaderColumn>
                       <TableHeaderColumn dataField='progress' dataFormat={ progressFormat } >Progression</TableHeaderColumn>
                       <TableHeaderColumn dataField='id' dataFormat={ contratpdfFormat } >Contrat</TableHeaderColumn>
                     </BootstrapTable>
                </Col>
                {this.props.pdf && this.props.pdf.pdf ? <ResponsiveEmbed a16by9>
                  <iframe
                    src={this.props.pdf.pdf}>
                  </iframe>
              </ResponsiveEmbed> : null}
                    {verticalLinearVisible}
            </div>
        );
    }

}


ContractsList.contextTypes = {
    tabContracts: React.PropTypes.object.isRequired,
};

export default ContractsList ;
