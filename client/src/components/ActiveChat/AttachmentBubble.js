import React from 'react';
import { Box, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: 80, 
    height: 80, 
    position: 'relative', 
    marginLeft: 10, 
    marginBottom: 10 
  },
  image:{
    height: '100%', 
    width: '100%', 
    borderRadius: 10,
    marginBottom: 10, 
    boxShadow: '0 0 6px #00000050', 
    objectFit: 'contain'
  },
  iconContainer:{
    display: 'flex', 
    position: 'absolute', 
    top: -10, 
    right: -10, 
    padding: 0, 
    zIndex: 1, 
    backgroundColor: 'transparent', 
    border: 'none'
  }
}));

// Component to render attachments before they are uploaded
const AttachmentBubble = ({image, index, removeImage, uploaded}) => {
  const classes = useStyles()
  return (
    <Box key={index} className={classes.container}>
      <img alt={"Uploaded"} src={image.displayURL} className={classes.image}/>
      <button 
        onClick={() => removeImage(index)}
        type={"button"}
        className={classes.iconContainer}>
        <Icon baseclassname="material-icons-two-tone" style={{ color: 'red'}}>remove_circle</Icon>
      </button>
    </Box>
  )
}

export default AttachmentBubble