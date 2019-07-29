import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { pick, merge } from 'lodash';
import PropTypes from 'prop-types';

const dataMapping = (data, flag) => {
  if(flag){
    const datatableData =
    data &&
    data.map(item =>
      pick(item, 'address', 'email', 'lname', 'mobile','refferalCode', 'occupation'),
    );
   return datatableData;
  } else {
    const datatableData =
    data &&
    data.map(item =>
      pick(item, 'amount', 'balance_transaction', 'description', 'receipt_url','timestamp', ''),
    );
    return datatableData;
  }
 



};

const DatatablePage = props => {
  const { agentDashboardData, flag } = props;
  const rowData = dataMapping(agentDashboardData, flag);
  if(flag){
    const data = {
      columns: [
        {
          label: 'Address',
          field: 'address',
          sort: 'asc',
          width: 270,
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 150,
        },
        
        {
          label: 'Name',
          field: 'lname',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Mobile#',
          field: 'mobile',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Refferal',
          field: 'refferalCode',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Occupation',
          field: 'occupation',
          sort: 'asc',
          width: 200,
        },
      ],
      rows: rowData,
    };
    return  (
      <MDBDataTable responsive striped bordered hover data={data} />
    );
  } else {
    const data = {
      columns: [
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
          width: 270,
        },
        {
          label: 'Balance Transaction',
          field: 'email',
          sort: 'asc',
          width: 150,
        },
        
        {
          label: 'Description',
          field: 'lname',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Receipt Url',
          field: 'mobile',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Time Stamp',
          field: 'timestamp',
          sort: 'asc',
          width: 100,
        },

      ],
      rows: rowData,
    };
    return  (
      <MDBDataTable responsive striped bordered hover data={data} />
    );
  }
 

 
};

DatatablePage.propTypes = {
  agentDashboardData: PropTypes.any,
};

export default DatatablePage;
