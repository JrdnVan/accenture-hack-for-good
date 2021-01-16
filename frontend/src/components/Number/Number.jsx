import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import './Number.css'
function Number(props) {
  return(
    <div className="number">
      <Box position="relative" display="inline-flex" className="number-box">
        <CircularProgress variant="determinate" value={100} size={200} color="secondary"/>
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
          <Typography variant="h2" component="div" color="textSecondary">{props.value}</Typography>
        </Box>
      </Box>
      <Typography variant="h6" component="h6">{props.label}</Typography>
    </div>
  );
}

export default Number;