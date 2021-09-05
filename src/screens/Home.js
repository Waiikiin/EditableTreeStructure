import React from 'react'
import axios from '../utils/axios';

function Home() {

  const get_tree = async () => {
    const response = await axios ({
      method: 'get',
      url: `/`, 
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
  }

  const update_node = async () => {
    const response = await axios ({
      method: 'get',
      url: `/`, 
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
}

  get_tree();

  return (
    <div>
      <p> I'm in HomeScreen </p>
    </div>
  )
}

export default Home
