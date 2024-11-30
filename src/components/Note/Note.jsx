import "./Note.scss";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, IconButton, TextField, CardActions, Popover } from "@mui/material";
import { ArchiveOutlined , Delete , AddAlertOutlined, InsertPhotoOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined, Close } from '@mui/icons-material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import ColorPalette from "../ColorPalette/ColorPalette";

export const Note = ({ data , handleColor, archivenote, unArchive, trashNote, unTrash, deletePermantly, handleNoteClick, closePopup, expandedNote}) => {
  const { title: initialTitle, description: initialDescription } = data;
  const [note, setNote] = useState({
    title: initialTitle,
    description: initialDescription,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
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

  let handlePalatteColor=(newColor)=>{
    handleColor(newColor, data._id)
  }

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleCloseColorPalette = () => {
    setColorAnchorEl(null);
  };

  const isColorPaletteOpen = Boolean(colorAnchorEl);

  return (
    <Card className="note-card"  style={{backgroundColor: `#${data.color}`}} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <CardContent  onClick={handleNoteClick&&(() => {handleNoteClick(data);console.log(data)})}>
      {/* Title */}
      <TextField
        fullWidth
        multiline
        value={note.title}
        variant="outlined"
        // onClick={(e) => e.stopPropagation()}
        onChange={(e) => setNote((prevNote) => ({ ...prevNote, title: e.target.value }))}
        className="note-title"
        style={{ pointerEvents: expandedNote?"auto":'none' }}
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
        onChange={(e) => setNote((prevNote) => ({ ...prevNote, description: e.target.value }))}
        style={{ pointerEvents: expandedNote?"auto":'none' }}
        // aria-readonly
      />
    </CardContent>
  
    {isHovered && (
      <CardActions className="note-actions">
        
        {!unTrash&&<IconButton onClick={() => console.log("alert")} >
          <AddAlertOutlined />
        </IconButton>}

        {!unTrash&&<IconButton onClick={() => console.log("Person add")} >
          <PersonAddAlt1Outlined />
        </IconButton>}

        {!unTrash&&<IconButton onClick={() => console.log("InsertPhotoOutlined")} >
          <InsertPhotoOutlined />
        </IconButton>}

        {!unTrash && (
            <>
              <IconButton onClick={handleColorClick}>
                <PaletteOutlined />
              </IconButton>
              <Popover
                open={isColorPaletteOpen}
                anchorEl={colorAnchorEl}
                onClose={handleCloseColorPalette}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onMouseLeave={handleCloseColorPalette}
              >
                <ColorPalette handlePalatteColor={handlePalatteColor} handleCloseColorPalette={handleCloseColorPalette}/>
              </Popover>
            </>
          )}

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

        {closePopup&&<IconButton
                aria-label="close"
                onClick={() => {
                  closePopup(data._id,note)
                }}>
                <Close />
        </IconButton>}
      </CardActions>
    )}

  </Card>
  
  );
};
