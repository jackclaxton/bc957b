import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 5,
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  attachmentsContainer:{
    display: 'flex',
  },
  attachment:{
    height: 70,  width: 70,
    borderRadius: 5,
    marginLeft: 10,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  const renderAttachments = () => (
    <Box className={classes.attachmentsContainer}>
      {attachments.map((attachment, index) => (
        <img className={classes.attachment} src={attachment} key={attachment + index}/>
      ))}
    </Box>
  )
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {attachments?.length === 1 && renderAttachments()}
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {attachments?.length > 1 && renderAttachments()}
    </Box>
  );
};

export default SenderBubble;
