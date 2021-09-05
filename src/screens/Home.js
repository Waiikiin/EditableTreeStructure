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

  const create_node = async (parentId, node) => {
    const response = await axios ({
      method: 'post',
      url: `/create`,
      data: {
        parentId: parentId,
        node: {
          id: '',
          parent: '',
          ...node,
        },
      }
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
  }

  const convertToCSV = async () => {
    const response = await axios ({
      method: 'get',
      url: `/export`,
    }).then(response => {
      const blob = new Blob([response.data], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'download.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log(response);
    }).catch(err => {
      console.error(err);
    })
  }

  const dummy_node = {
    name: "dummyNode",
    description: "just a dummy node",
    read_only: '0',
  }

  // convertToCSV();
  // get_tree();
  // update_node(30, 'node123')
  // delete_node(2);
  // create_node(5, dummy_node) 

  return ( 
    <div>
      <p> I'm in HomeScreen </p>
    </div>
  )
}

export default Home
