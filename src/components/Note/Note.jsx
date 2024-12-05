import "./Note.scss";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, IconButton, TextField, CardActions, Popover } from "@mui/material";
import { ArchiveOutlined , Delete , AddAlertOutlined, InsertPhotoOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined, Close } from '@mui/icons-material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import ColorPalette from "../ColorPalette/ColorPalette";
import { trash ,updateNote, archive, deleteForever} from "../../utils/Api";

export const Note = ({ data, handleNoteClick, closePopup, expandedNote, handleAction, status}) => {
  const { title: initialTitle, description: initialDescription, color: initialColor} = data;
  const [note, setNote] = useState({
    title: initialTitle,
    description: initialDescription,
    color: initialColor
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

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleCloseColorPalette = () => {
    setColorAnchorEl(null);
  };

  let actionClick=async(action, newData)=>{
    switch (action) {
      case "color":
        setIsHovered(false)
        setNote((prev)=>({...prev,color:newData}))
        await updateNote(data._id, {color:newData});
        handleAction(action, [data._id, newData])
        break;

      case "archive" :
      case "unArchive":  
        await archive(newData._id);
        handleAction(action, newData._id)
        break;

      case "trash" :
      case "unTrash" :
        await trash(newData._id);
        handleAction(action, newData._id)
        break;

      case "deletePermantly":
        await deleteForever(newData._id)
        handleAction(action, newData._id) 
    }
  }

  const isColorPaletteOpen = Boolean(colorAnchorEl);

  return (
    <Card className="note-card"  style={{backgroundColor: note.color?`#${note.color}` : `#${data.color}`}} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <CardContent  onClick={handleNoteClick&&(() => {handleNoteClick(data)})}>
      {/* Title */}
      <TextField
        fullWidth
        multiline
        value={note.title}
        variant="outlined"
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
      />
    </CardContent>
  
    {isHovered && (
      <CardActions className="note-actions">
        
        {status.includes("alert")&&<IconButton>
          <AddAlertOutlined />
        </IconButton>}

        {status.includes("personAdd")&&<IconButton>
          <PersonAddAlt1Outlined />
        </IconButton>}

        {status.includes("imageAdd")&&<IconButton>
          <InsertPhotoOutlined />
        </IconButton>}

        {status.includes("colorPalette") && (
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
                <ColorPalette actionClick={actionClick} handleCloseColorPalette={handleCloseColorPalette}/>
              </Popover>
            </>
          )}

        {status.includes("archive")&&<IconButton onClick={() => {actionClick("archive", data)}} >
          <ArchiveOutlined />
        </IconButton>}
  
        {status.includes("unArchive")&&<IconButton onClick={() => {actionClick("unArchive", data)}} >
          <UnarchiveOutlinedIcon />
        </IconButton>}
        
        {<IconButton onClick={status.includes("unTrash") ? () => {actionClick("unTrash", data)}:() => {actionClick("trash", data)}}>
          <Delete />
        </IconButton>}

        {status.includes("deletePermantly")&&<IconButton onClick={() => {actionClick("deletePermantly",data)}}>
          <DeleteForeverOutlinedIcon/>
        </IconButton>}

        {status.includes("moreVert")&&<IconButton style={{padding:"0px"}}>
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
