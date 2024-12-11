import { useState, useRef, useEffect } from "react";
import { IconButton, Popover, TextField, Button } from "@mui/material";
import { BrushOutlined, CheckBoxOutlined, InsertPhotoOutlined, AddAlertOutlined, PaletteOutlined, PersonAddAlt1Outlined, MoreVertOutlined, ArchiveOutlined, UndoOutlined, RedoOutlined } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import ColorPalette from "../ColorPalette/ColorPalette";
import { archive, createNote, deleteForever, updateNote } from "../../utils/Api";

export default function TakeNote({ handleAction, editNote,}) {
  const [takeNoteState, setTakeNoteState] = useState(editNote?true:false);
  const [note, setNote] = useState(editNote?{ title: editNote.title, description: editNote.description , color: editNote.color}:{ title: "", description: "" , color: ""});
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const noteRef = useRef(null);

  const handleTakeNoteAction = async(action) => {
    if (note.title || note.description) {
      const createNoteResponse = await createNote(note)
      switch(action){
        case "add" :  handleAction("add", createNoteResponse.data.data);
                      break
        case "archive" : await archive(createNoteResponse.data.data._id);
                         break
      }
      setNote({ title: "", description: "", color:"" });
      setTakeNoteState(false);
    }
  }

  const handleEditNote =async(action, note)=>{
    if (note.title || note.description) {
      switch(action){
        case "update" : await updateNote(editNote._id, note);
                        setTakeNoteState(false);
                        handleAction("editNote", {editNote, note})
                        break
        case "archive" : await updateNote(editNote._id, note);
                        await archive(editNote._id);
                        setTakeNoteState(false);
                        handleAction("archiveEditNote", editNote._id)
                        break

      }  
    }
    else {
      await deleteForever(editNote._id)
      setTakeNoteState(false);
      handleAction("deleteEditNote", editNote._id)
    }
  }

  let handlePalatteColor=(action, newColor)=>{
    setNote((prev)=>({...prev,color:newColor}))
  }
  
  const handleCloseColorPalette = () => 
    setColorAnchorEl(null);
  

  const isColorPaletteOpen = Boolean(colorAnchorEl);

  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        if(editNote)
          handleEditNote("update", note)
        else{
          handleTakeNoteAction("add");
          setNote({ title: "", description: "", color: "" });
          setTakeNoteState(false);
        }
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
        onFocus={()=>{setTakeNoteState(true); setIsTitleFocused(true)}}
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        onBlur={()=> setIsTitleFocused(false)}
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
            onFocus={ ()=>setIsDescriptionFocused(true) }
            onBlur={ ()=>setIsDescriptionFocused(false) }
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
              }}
            >
              <IconButton>
                <AddAlertOutlined className="icon-button" />
              </IconButton>

              <IconButton>
                <PersonAddAlt1Outlined className="icon-button" />
              </IconButton>

              <IconButton onClick={ (event)=> setColorAnchorEl(event.currentTarget) }>
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

              <IconButton>
                <InsertPhotoOutlined className="icon-button" />
              </IconButton>

              <IconButton aria-label="archive">
                <ArchiveOutlined onClick={()=>editNote?handleEditNote("archive", note):handleTakeNoteAction("archive")} className="icon-button"/>
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
                onClick={()=>editNote?handleEditNote("update", note):handleTakeNoteAction("add")}
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
              }}
            >
              <Button
                variant="outlined" 
                color="primary"
                onClick={() => {
                editNote?handleEditNote("update", note):handleTakeNoteAction("add");
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