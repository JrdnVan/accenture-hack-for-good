import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import './Donut.css'
function Donut(props) {
  return(
    <div className="donut">
      <Box position="relative" display="inline-flex" className="donut-box">
        <CircularProgress variant="determinate" value={props.value} size={150}/>
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" component="div" color="textSecondary">{props.value}%</Typography>
        </Box>
      </Box>
      <Typography variant="h5" component="h5">{props.label}</Typography>
    </div>
  );
}

export default Donut;