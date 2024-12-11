import { useState, useRef, useEffect } from "react";
import { IconButton, Popover, TextField, Button } from "@mui/material";
import { BrushOutlined, CheckBoxOutlined, InsertPhotoOutlined, AddAlertOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined, ArchiveOutlined, UndoOutlined, RedoOutlined } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import ColorPalette from "../ColorPalette/ColorPalette";
import { archive, createNote } from "../../utils/Api";

export default function TakeNote({ handleAction }) {
  const [takeNoteState, setTakeNoteState] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" , color: ""});
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const noteRef = useRef(null);
  
  const handleAdd = async() => {
    if (note.title || note.description) {
      let createNoteResponse = await createNote(note)
      handleAction("add", createNoteResponse.data.data);
      setNote({ title: "", description: "", color:"" });
      setTakeNoteState(false);
    }
  };

  const handleArchive = async() => {
    if (note.title || note.description) {
      let createNoteResponse = await createNote(note)
      await archive(createNoteResponse.data.data._id);
      setNote({ title: "", description: "", color:"" });
      setTakeNoteState(false);
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

  let handlePalatteColor=(action, newColor)=>{
    setNote((prev)=>({...prev,color:newColor}))
  }
  

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleCloseColorPalette = () => {
    setColorAnchorEl(null);
  };

  const isColorPaletteOpen = Boolean(colorAnchorEl);

  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        handleAdd();
        setNote({ title: "", description: "", color: "" });
        setTakeNoteState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [note]);

  return (
    <span
      ref={noteRef}
      className={`takeNote ${takeNoteState ? "active" : ""}`}
      style={{
        width: "43em",
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
              <IconButton>
                <CheckBoxOutlined />
              </IconButton>
              <IconButton>
                <BrushOutlined />
              </IconButton>
              <IconButton>
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
              <IconButton>
                <AddAlertOutlined className="icon-button" />
              </IconButton>

              <IconButton>
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
                <ColorPalette actionClick={handlePalatteColor} handleCloseColorPalette={handleCloseColorPalette} />
              </Popover>
            {/* </> */}

              <IconButton>
                <InsertPhotoOutlined className="icon-button" />
              </IconButton>

              <IconButton aria-label="archive">
                <ArchiveOutlined onClick={handleArchive} className="icon-button"/>
              </IconButton>

              <IconButton>
                <MoreVertOutlined className="icon-button" />
              </IconButton>

              <IconButton>
                <UndoOutlined className="icon-button" />
              </IconButton>

              <IconButton>
                <RedoOutlined className="icon-button" />
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
              {/* <IconButton
                // aria-label="close"
                
                }}> */}
                {/* <Close /> */}
              {/* </IconButton> */}

              <Button
                variant="outlined" 
                color="primary"
                onClick={() => {
                handleAdd();
                setTakeNoteState(false);
                setNote({ title: "", description: "", color:"" });}}
                style={{fontSize:"medium", borderRadius:"1em", color:"rgba(0, 0, 0, 0.59)", border:"none",textTransform: "none"}}
              >
                Close
              </Button> 

            </span>
          </span>
        </>
      )} 
    </span>
  );
}