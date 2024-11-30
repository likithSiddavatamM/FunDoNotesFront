import { useState, useRef, useEffect } from "react";
import { IconButton, Popover, TextField } from "@mui/material";
import { ArchiveOutlined, Close } from "@mui/icons-material";
import { BrushOutlined, CheckBoxOutlined, InsertPhotoOutlined, AddAlertOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined} from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from "@mui/material";
import ColorPalette from "../ColorPalette/ColorPalette";

export default function TakeNote({ onAddNote }) {
  const [takeNoteState, setTakeNoteState] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" , color: ""});
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const noteRef = useRef(null);
  
  const handleAdd = () => {
    if (note.title || note.description) {
      onAddNote(note);
      setTakeNoteState(false);
      setNote({ title: "", description: "", color:"" });
    }
  };

  const handleTitleFocus = () => {
    setTakeNoteState(true);
    setIsTitleFocused(true);
  };

  const handleTitleBlur = () => {
    setIsTitleFocused(false);
  };

  const handleDescriptionFocus = () => {
    setIsDescriptionFocused(true);
  };

  const handleDescriptionBlur = () => {
    setIsDescriptionFocused(false);
  };




  let handlePalatteColor=(newColor)=>{
    setNote((prev)=>({...prev,color:newColor}))
  }
  

  const handleColorClick = (event) => {
    console.log(event,"......", event.currentTarget)
    setColorAnchorEl(event.currentTarget);
  };

  const handleCloseColorPalette = () => {
    setColorAnchorEl(null);
  };

  const isColorPaletteOpen = Boolean(colorAnchorEl);

  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        handleAdd()
        setNote({ title: "", description: "", color: "" });
        setTakeNoteState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }/*, []*/);

  return (
    <span
      ref={noteRef}
      className={`takeNote ${takeNoteState ? "active" : ""}`}
      style={{
        width: "33em",
        display: "flex",
        flexDirection: "column",
        marginTop: "2em",
        marginBottom: "1em",
        border: takeNoteState ? "1px solid rgba(100, 100, 100, 0.3)" : "none",
        borderRadius: "2%",
        backgroundColor: note.color?`#${note.color}`:"white",
        boxShadow: takeNoteState
        ? "0px 6px 16px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <TextField
        placeholder={takeNoteState ? "Title" : "Take a note"}
        onFocus={handleTitleFocus}
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        onBlur={handleTitleBlur}
        fullWidth
        multiline
        sx={{
          textAlign: "center",
          marginBottom: "8px",
          borderRadius:"10px",
          boxShadow: takeNoteState ? "none" : "0px 2px 8px rgba(0, 0, 0, 0.15)" ,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: takeNoteState || isTitleFocused ? "none" : "1px solid rgba(100, 100, 100, 0.3)",
              borderRadius:"10px"
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          endAdornment: !takeNoteState?(
            <InputAdornment position="end">
              <IconButton onClick={() => console.log("CheckBoxOutlined")}>
                <CheckBoxOutlined />
              </IconButton>
              <IconButton onClick={() => console.log("BrushOutlined")}>
                <BrushOutlined />
              </IconButton>
              <IconButton onClick={() => console.log("InsertPhotoOutlined")}>
                <InsertPhotoOutlined />
              </IconButton>
            </InputAdornment>
          ):null
        }}
        
      />

      {takeNoteState && (
        <>
          <TextField
            placeholder="Description"
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
            onFocus={handleDescriptionFocus}
            onBlur={handleDescriptionBlur}
            multiline
            minRows={3}
            fullWidth
            sx={{
              marginBottom: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: takeNoteState || isDescriptionFocused || isTitleFocused ? "none" : "1px solid rgba(0, 0, 0, 0.23)",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />

          <span style={{display:"flex", justifyContent:"space-around", gap:"55px"}}>
            <span
              className="Icons"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "18px",
                gap:"15px"
              }}>
              <IconButton onClick={() => console.log("Bell Alert Icon")} >
                <AddAlertOutlined className="icon-button" />
              </IconButton>

              <IconButton onClick={() => console.log("Person add")} >
                <PersonAddAlt1Outlined className="icon-button" />
              </IconButton>

              {/* <> */}
              <IconButton onClick={handleColorClick}>
                <PaletteOutlined className="icon-button"/>
              </IconButton>
              <Popover
                open={isColorPaletteOpen}
                anchorEl={colorAnchorEl}
                onClose={handleCloseColorPalette}
                container={noteRef.current}
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
                <ColorPalette onClick={()=>console.log("colorpalatte")} handlePalatteColor={handlePalatteColor} /*handleCloseColorPalette={handleCloseColorPalette}*/ />
              </Popover>
            {/* </> */}

              <IconButton onClick={() => console.log("InsertPhotoOutlined")} >
                <InsertPhotoOutlined className="icon-button" />
              </IconButton>

              <IconButton aria-label="archive">
                <ArchiveOutlined />
              </IconButton>

              <IconButton onClick={() => console.log("MoreVertOutlined")} >
                <MoreVertOutlined className="icon-button" />
              </IconButton>

              <Button 
                variant="outlined" 
                color="primary" 
                disabled={(note.title||note.description)?false:true}      
                onClick={handleAdd}
                style={{fontSize:"medium", borderRadius:"1em", color:(note.title||note.description)&&"rgba(0, 0, 0, 0.59)", border:"none"}}
                >
              Add
              </Button>
            </span>
            <span
              className="Icons"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "18px",
                gap:"11px"
              }}>
              <IconButton
                aria-label="close"
                onClick={() => {
                  handleAdd();
                  setTakeNoteState(false);
                  // setNote({ title: "", description: "" });
                }}>
                <Close />
              </IconButton>
            </span>
          </span>
        </>
      )} 
    </span>
  );
}