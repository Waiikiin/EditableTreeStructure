import React from 'react'
import axios from '../utils/axios';

function Home() {

    const getRequest = async () => {
  
      const response = await axios ({
        method: 'get',    
        url: `/`,
    }).then( response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
  }

  //   const get_tree = async () => {
  //     var formData = new FormData();
  //     formData.append('file', '../data/tree_data.csv');
  //     const response = await axios ({
  //       method: 'get',
  //       data: formData,
  //       url: `/getTree`,
  //   }).then( response => {
  //     console.log(response);
  //   }).catch(err => {
  //     console.error(err);
  //   })
  // }
  getRequest();
  return (
    <div>
      <p> I'm in HomeScreen </p>
    </div>
  )
}

export default Home
