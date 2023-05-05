import React from 'react';
import PageHeader from './common/pageHeader';

function Page404(props){
  return(
    <div className="py-2">
      <i className="text-warning"><PageHeader title="Page not found , 404!" /></i>
      <div className="d-flex flex-column bg-light bg-gradient px-2">
      <img src="https://images.pexels.com/photos/5560528/pexels-photo-5560528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="astronaut" className="w-25  m-auto"/>
       <a href="/" className="btn btn-outline-info rounded ms-auto mb-auto py-3 w-25">Home</a></div>
    </div> 
  )
}

export default Page404