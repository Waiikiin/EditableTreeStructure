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

  const update_node = async (id, name) => {
    const response = await axios ({
      method: 'post',
      url: `/update`,
      data: {
        id: id,
        name: name,
      }
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
  }

  const delete_node = async (id) => {
    const response = await axios ({
      method: 'post',
      url: `/delete`,
      data: {
        id: id,
      }
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
  }

  // get_tree();
  // update_node(2, 'node123')
  delete_node(2);
  return (
    <div>
      <p> I'm in HomeScreen </p>
    </div>
  )
}

export default Home
