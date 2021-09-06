import React from 'react'
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import { alpha, withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  input: {
    padding: 0,
    height: 5,
    margin: 0,
  }
});

function StyledTreeItem( {key, id, value, readOnly} ) {
  
    const TransitionComponent = (props) => {
        const style = useSpring({
          from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
          to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
        });
      
        return (
          <animated.div style={style}>
            <Collapse {...props} />
          </animated.div>
        );
    }




    const root = useStyles();

    return (
        <>
            <TreeItem 
              key={id} 
              nodeId={id} 
              TransitionComponent={TransitionComponent}
              label={
                <TextField
                  value={value}
                  InputProps={{ root: { input: root.input }}}
                  onChange={handleChange}
                />
              } 
            />
        </>
    )
}

export default StyledTreeItem
