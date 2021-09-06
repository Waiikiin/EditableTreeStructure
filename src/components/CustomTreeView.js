import React, {useState, useEffect} from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';

import axios from '../utils/axios';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}


const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 350,
  },
  inputInput: {
    padding: "4px 8px"
  }
});


function CustomTreeView(props) {

  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tree, setTree] = useState([]);
  const [currentId, setCurrentId] = useState(-1);
  const [dbClickedId, setDbClickedId] = useState(-1);

  useEffect(() => {
    const fetchTree = async () => {
      const response = await axios ({
        method: 'get',
        url: `/`, 
      }).then(response => {
        setTree(response.data);
      }).catch(err => {
        console.error(err);
      })
    }
    
    fetchTree();
  }, [])

  const handleChange = (event, read_only) => {
    // console.log(event)
    // setCurrentId(event.target.attributes.id.value);
    if (read_only > 0) {
       return;
    }
    setValue(event.target.value);
  };


  const buildTree = (data) =>  (
    data && data.map(node => (
      <TreeItem key={node.id} nodeId={node.id} label={ currentId == node.id
          ?
          <TextField
            value={value ? value : setValue(node.name)}
            variant="outlined"
            InputProps={{ classes: { input: classes.inputInput } }}
            onChange={ event => handleChange(event, node.read_only)}
            disabled={node.read_only > 0 ? true : false}
          />
          :
          node.name
        }  
      >
        {node.children && buildTree(node.children)}
      </TreeItem>
    ))
  )


  const handleNodeSelect = (event, value) => {
    event.preventDefault();
    setCurrentId(value);
    setValue(null);
  }

  const onUpdate = async (event) => {
    event.preventDefault();



  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      onNodeSelect={handleNodeSelect}
    >
    <form noValidate autoComplete="off" >
      {buildTree(tree)}
      
      {/* <TreeItem nodeId="1" label="Applications">
          <TreeItem
            id='2'
            nodeId="2"
            label={
              "sdfdsf"
            }
            onDoubleClick={handleDBClick}
          />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem> */}


      </form>
      <Button onClick={onUpdate}> Update </Button>
      <Button> Delete </Button>
      <Button> Create </Button>
      <Button> Download CSV </Button>
    </TreeView>
  );
}

export default CustomTreeView