import "./Note.scss";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, IconButton, TextField, CardActions } from "@mui/material";
import { ArchiveOutlined , Delete , AddAlertOutlined, InsertPhotoOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined } from '@mui/icons-material';

export const Note = ({ data }) => {
  const { title: initialTitle, description: initialDescription } = data;

  const [note, setNote] = useState({
    title: initialTitle,
    description: initialDescription,
  });
  // const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textAreaRef = useRef(null);

  // const handleTitleChange = (event) => {
  //   setNote((prevNote) => ({ ...prevNote, title: event.target.value }));
  // };

  // const handleDescriptionChange = (event) => {
  //   setNote((prevNote) => ({ ...prevNote, description: event.target.value }));
  //   setIsExpanded(true);
  // };

  const handleResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    handleResize();
  }, [note.description]);

  return (
    <Card className="note-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <CardContent>
      {/* Title */}
      <TextField
        fullWidth
        multiline
        value={note.title}
        // onChange={handleTitleChange}
        variant="outlined"
        onClick={(e) => e.stopPropagation()}
        className="note-title"
      />
  
      {/* Description */}
      <TextField
        fullWidth
        value={note.description}
        // onChange={handleDescriptionChange}
        variant="outlined"
        multiline
        rows={1}
        className="note-description"
        inputRef={textAreaRef}
        onInput={handleResize}
        aria-readonly
      />
    </CardContent>
  
    {isHovered && (
      <CardActions className="note-actions">
        
        <IconButton onClick={() => console.log("Bell Alert Icon")} >
          <AddAlertOutlined className="icon-button" />
        </IconButton>

        <IconButton onClick={() => console.log("Person add")} >
          <PersonAddAlt1Outlined className="icon-button" />
        </IconButton>

        <IconButton onClick={() => console.log("PaletteOutlined")} >
          <PaletteOutlined className="icon-button" />
        </IconButton>

        <IconButton onClick={() => console.log("InsertPhotoOutlined")} >
          <InsertPhotoOutlined className="icon-button" />
        </IconButton>

        <IconButton onClick={() => console.log("Note Archived")} >
          <ArchiveOutlined className="icon-button" />
        </IconButton>
  
        <IconButton onClick={() => console.log("Note Deleted")}>
          <Delete />
        </IconButton>

        <IconButton onClick={() => console.log("MoreVertOutlined")} >
          <MoreVertOutlined className="icon-button" />
        </IconButton>
      </CardActions>
    )}
  </Card>
  
  );
};
