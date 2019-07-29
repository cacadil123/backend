import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { pick, merge, isEmpty, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
function getUnique(arr, comp) {

  const unique = arr
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
}

const dataMapping = (data, noCount) => {
    console.log('daa',data);
    const datatableData =
    data &&
    data.reverse().map(item =>
      pick(item, 'refferalCode'),
    );
     if(datatableData!==null){
      let removeEmpty=datatableData.filter(v=>v.refferalCode!="");
   
      const value = noCount && noCount.noCount.reverse().map(el => ({code: el}));
      const finalMost = merge(removeEmpty,value);
     
      return getUnique(finalMost,'refferalCode');
     } else {
       return "something wents wrong"
     }
 


};

const DatatablePage = props => {
  const { agentDashboardData, noCount } = props;
  const rowData = dataMapping(agentDashboardData, noCount);
  
    const data = {
      columns: [
        {
          label: 'Refferal Code',
          field: 'refferalCode',
          sort: 'asc',
          width: 270,
        },
        {
          label: 'Occurance',
          field: 'code',
          sort: 'asc',
          width: 150,
        }
      ],
      rows: rowData,
    };
    return  (
      <MDBDataTable responsive striped bordered hover data={data} />
    );
  }
 


DatatablePage.propTypes = {
  agentDashboardData: PropTypes.any,
};

export default DatatablePage;
