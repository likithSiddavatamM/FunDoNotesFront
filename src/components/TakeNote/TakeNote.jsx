import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function TakeNote() {
  const [takeNoteState, setTakeNoteState] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" });
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const noteRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setTakeNoteState(false);
        setNote({ title: "", description: "" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span
      ref={noteRef}
      className="takeNote"
      style={{
        width: "200%",
        display: "flex",
        flexDirection: "column",
        marginTop: "15%",
        border: takeNoteState ? "1px solid rgba(100, 100, 100, 0.3)" : "none",
        borderRadius: "2%",
        boxShadow: takeNoteState
        ? "0px 6px 16px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      
      {/* Title Field */}
      <TextField
        placeholder={takeNoteState ? "Title" : "Take a note"}
        onFocus={handleTitleFocus}
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        onBlur={handleTitleBlur}
        fullWidth
        sx={{
          textAlign: "center",
          marginBottom: "8px",
          boxShadow: takeNoteState ? "none" : "0px 2px 8px rgba(0, 0, 0, 0.15)" ,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: takeNoteState || isTitleFocused ? "none" : "1px solid rgba(100, 100, 100, 0.3)",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
        
      />

      {/* Description Field and Icons */}
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
                  border: takeNoteState || isDescriptionFocused || isTitleFocused ? "none" : "1px solid rgba(0, 0, 0, 0.23)", // Border shown when unfocused
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />

          {/* Icons */}
          <span
            className="Icons"
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "8px",
            }}
          >
            <IconButton aria-label="archive">
              <ArchiveIcon />
            </IconButton>
            <IconButton aria-label="add">
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={() => {
                setTakeNoteState(false);
                setNote({ title: "", description: "" });
              }}
            >
              <CloseIcon />
            </IconButton>
          </span>
        </>
      )} 
    </span>

  );
}