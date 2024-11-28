import "./Note.scss";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, IconButton, TextField, CardActions } from "@mui/material";
import { ArchiveOutlined , Delete , AddAlertOutlined, InsertPhotoOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined } from '@mui/icons-material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';

export const Note = ({ data , archivenote, unArchive, trashNote, unTrash, deletePermantly}) => {
  const { title: initialTitle, description: initialDescription } = data;

  const [note, setNote] = useState({
    title: initialTitle,
    description: initialDescription,
  });
  const [isHovered, setIsHovered] = useState(false);
  const textAreaRef = useRef(null);
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
        variant="outlined"
        onClick={(e) => e.stopPropagation()}
        className="note-title"
      />
  
      {/* Description */}
      <TextField
        fullWidth
        value={note.description}
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
        
        {!unTrash&&<IconButton onClick={() => console.log("Bell Alert Icon")} >
          <AddAlertOutlined />
        </IconButton>}

        {!unTrash&&<IconButton onClick={() => console.log("Person add")} >
          <PersonAddAlt1Outlined />
        </IconButton>}

        {!unTrash&&<IconButton onClick={() => console.log("PaletteOutlined")} >
          <PaletteOutlined />
        </IconButton>}

        {!unTrash&&<IconButton onClick={() => console.log("InsertPhotoOutlined")} >
          <InsertPhotoOutlined />
        </IconButton>}

        {archivenote&&<IconButton onClick={() => {archivenote(data)}} >
          <ArchiveOutlined />
        </IconButton>}
  
        {unArchive&&<IconButton onClick={() => {unArchive(data)}} >
          <UnarchiveOutlinedIcon />
        </IconButton>}
        
        {<IconButton onClick={unTrash ? () => {unTrash(data)}:() => {trashNote(data)}}>
          <Delete />
        </IconButton>}

        {unTrash&&<IconButton onClick={() => {deletePermantly(data)}}>
          <DeleteForeverOutlinedIcon/>
        </IconButton>}

        {!unTrash&&<IconButton style={{padding:"0px"}} onClick={() => console.log("MoreVertOutlined")} >
          <MoreVertOutlined className="custom-icon" />
        </IconButton>}
      </CardActions>
    )}
  </Card>
  
  );
};
