import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  },
  attachmentsContainer:{
    display: 'flex',
  },
  attachment:{
    height: 70,  width: 70,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments } = props;
  const renderAttachments = () => (
    <Box className={classes.attachmentsContainer}>
      {attachments.map((attachment, index) => (
        <img className={classes.attachment} src={attachment} key={attachment + index}/>
      ))}
    </Box>
  )
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        {attachments?.length === 1 && renderAttachments()}
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
        {attachments?.length > 1 && renderAttachments()}
      </Box>
      
    </Box>
  );
};

export default OtherUserBubble;
