import React, { Component } from 'react';

import 'react-sticky-table/dist/react-sticky-table.css';
import { Table } from "reactable";
import Axios from 'axios';
import Datatable from './Datatable';
import ReffTable from './ReffDataTable';
import {merge} from 'lodash';

 class Admin extends Component {
  constructor(props){
    super(props);
    this.state={
      mostUsedRef: '',
      size: '',
      finalCount: [],
    }
  }
   
  getModes=(array)=> {
    var frequency = {}; // array of frequency.
    var maxFreq = 0; // holds the max frequency.
    var modes = [];
    var noCount=[];
  
    for (var i in array) {
      frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
  
      if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
        maxFreq = frequency[array[i]]; // update max.
      
      }
      noCount.push(frequency[array[i]]);
    }
 
    for (var k in frequency) {
      if (frequency[k] == maxFreq) {
        modes.push(k);
      }
    }
  
    return merge({user: modes,noCount: noCount});
  }
    componentWillMount(){
  
        Axios.get('http://18.220.236.209/api/users/admin').then(function (response) {
            // handle success

           localStorage.setItem('response', JSON.stringify(response));
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
          Axios.get('http://18.220.236.209/api/users/all-users')
  .then(function (response) {
    // handle success
    console.log('response', response.data.users.length);
    const size = response.data.users.length;
    localStorage.setItem('total_user',(JSON.stringify(response.data.users.length)));
    localStorage.setItem('saveAll',(JSON.stringify(response.data.users)));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
 
  if(localStorage.getItem('saveAll')!==null){
    let result = JSON.parse(localStorage.getItem('saveAll') && localStorage.getItem('saveAll')).map(({ refferalCode }) => refferalCode)
  
    let removeEmpty=result.filter(v=>v!='');
  
    let finalValue = this.getModes(removeEmpty);
    localStorage.setItem('noCount', JSON.stringify(finalValue));
    this.setState({size: localStorage.getItem('total_user')});
  
  
    this.setState({mostUsedRef: finalValue[0]});
      } else {
        localStorage.setItem('total_user',(JSON.stringify(response.data.users.length)));
        localStorage.setItem('saveAll',(JSON.stringify(response.data.users)));
      }
  }
  
  render() {
      const newResponse =  JSON.parse(localStorage.getItem('response') && localStorage.getItem('response'));
      const count = JSON.parse(localStorage.getItem('noCount'));
    return (
      <div>
        <div style={{width: '100%', height: '400px'}}>
        <div>
            <div className="style">
              <span>Total Registered User</span> : {this.state.size}
              {/* <span className ="padd">Most Used Refferal</span> : {this.state.mostUsedRef}
             */}
            </div>
            <div className="col-md-12">
                  <div className="dataTable">
                  <h1>Register User Information</h1>
                    <Datatable
                      agentDashboardData={newResponse && newResponse.data.users}
                      flag ={true}
                    
                    />

                  </div>


                  <div className="dataTable">
                  <h1>Refferal Information</h1>
                    <ReffTable
                      agentDashboardData={newResponse && newResponse.data.users}
                      noCount={count}
                    />

                  </div>

                </div>


                <div className="col-md-12">
                  <div className="dataTable">
                  <h1>Payments  Information</h1>
                    <Datatable
                      agentDashboardData={newResponse && newResponse.data.payment}
                      flag={false}
                    />
                  </div>
                </div>
        {/* <Table className="table" data={newResponse && newResponse.data.users} />,
        <h1>Payments Information</h1>
        <Table className="table" data={newResponse && newResponse.data.payment} />, */}
        
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;