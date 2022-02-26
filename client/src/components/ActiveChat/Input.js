import React, { useState, useRef, useEffect } from "react";
import { FormControl, FilledInput, Icon, IconButton, InputAdornment, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AttachmentBubble from "./AttachmentBubble";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    justifyContent: 'center',
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  sendImagesButton: {
    width: 35,
    height: 35,
    borderRadius: '50%',
    border: 'none',
    marginLeft: 10,
    boxShadow: '0 0 3px #00000070',
  },
  sendIcon: {
    transform: 'rotate(-45deg)',
    fontSize: 20,
    color: 'white',
  }
}));

const Input = (props) => {
  const theme = useTheme()
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;
  const fileInputRef = useRef();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const removeImage = (imageIndex) => {
    // Remove image from message before sending
    let imagesCopy = [...images];
    imagesCopy.splice(imageIndex, 1);
    setImages(imagesCopy);
  }
  const readFiles = (files) => {
    // Read files from <input> and add displayURL
    let numImages = files['length'];
    let images = [];
    for(let x = 0; x < numImages; x++){
      const image = files[x];
      const displayURL = URL.createObjectURL(image);
      image.displayURL = displayURL;
      images.push(image);
    }
    setImages(images);
  }
  const onPressAttachFile = async (event) => {
    // Read files and add displayURL to image to display before uploading
    const files = event.target.files;
    const images = readFiles(files)
  }
  const uploadImage = async (imgData) => {
    // Upload a single image to cloudinary
      try{
        // delete imgData.displayURL;
        const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
        const bucketID = process.env.REACT_APP_BUCKET_ID;
        const cloudName = process.env.REACT_APP_CLOUD_NAME;

        const data = new FormData();
        data.append('file', imgData);
        data.append(uploadPreset, bucketID)

        const instance = axios.create();
        const uploadResponse = await instance.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        const imageURL = uploadResponse.data.secure_url;
        return imageURL;
      }catch(error){
        console.error('uploadImage error: ', error)
      }
  }
  const uploadImages = async (images) => {
    // Takes an array images and uploads them to cloudinary, 
    // returning an array of the download url's for those images
    const numImages = images.length;
    let imageUploads = [];
    images.forEach((image) => {
      imageUploads.push(uploadImage(image))
    })
    let imageURLs = await Promise.all(imageUploads);
    return imageURLs;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isLoading){ return }
    try{
      setIsLoading(true)
      // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
      let reqBody = {
        text: event.target.text.value,
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user
      };
      if(images.length > 0){
        let attachments = await uploadImages(images);
        reqBody.attachments = attachments;
      }
      await postMessage(reqBody);
      setText("");
      setImages([])
      setIsLoading(false)
    }catch(error){
      setIsLoading(false)
      console.error('handleSubmit error: ', error)
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {images.length > 0 &&
        <Grid container direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
        {images.map((image, index) => (
          <AttachmentBubble key={image + index} image={image} index={index} removeImage={removeImage} uploaded={false}/>
        ))}
        {images.length > 0 &&
          <button className={classes.sendImagesButton} style={{ backgroundColor: theme.palette.primary.main }}>
            <Icon baseclassname="material-icons-two-tone" className={classes.sendIcon}>send</Icon>
          </button>
        }
        </Grid>
      }
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleTextChange}
          endAdornment={
            <InputAdornment
              position="end"
              onClick={() => fileInputRef.current.click()}>
                <input type={'file'} name={'myImage'} ref={fileInputRef} onChange={onPressAttachFile} accept="image/x-png,image/gif,image/jpeg" multiple hidden/>
                  <IconButton aria-label="attach photo" >
                    <Icon baseclassname="material-icons-two-tone" style={{zIndex: 3}}>insert_photo</Icon>
                  </IconButton>
            </InputAdornment>
          }>
        </FilledInput>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);