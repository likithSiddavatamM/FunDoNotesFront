import "./Note.scss";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, IconButton, TextField, CardActions } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export const Note = ({data }) => {
  const { title: initialTitle, description: initialDescription } = data;

  const [note, setNote] = useState({
    title: initialTitle || "Default Title",
    description: initialDescription || "Default description text",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);

  const handleTitleChange = (event) => {
    setNote((prevNote) => ({ ...prevNote, title: event.target.value }));
  };

  const handleDescriptionChange = (event) => {
    setNote((prevNote) => ({ ...prevNote, description: event.target.value }));
    setIsExpanded(true);
  };

  const handleResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleCardClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, [note.description]);

  useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }, []);

  return (
    <Card
      ref={cardRef}
      className={`note-card ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={handleCardClick}
      style={{
        position: "relative",
        paddingBottom: "50px",
      }}
    >
      <CardContent>
        {/* Title */}
        <TextField
          placeholder="Title"
          fullWidth
          value={isExpanded
              ? note.title
              : `${note.title.substring(0, 30)}${note.title.length > 30 ? "..." : ""}`
          }          
          onChange={handleTitleChange}
          variant="outlined"
          style={{ marginBottom: "16px" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }} 
        />

        {/* Description */}
        <TextField
          placeholder="Description"
          fullWidth
          value={isExpanded
            ? note.description
            : `${note.description.substring(0, 30)}${note.description.length > 30 ? "..." : ""}`
        }
          onChange={handleDescriptionChange}
          variant="outlined"
          multiline
          rows={1}
          style={{
            resize: "none",
            minHeight: "50px",
            overflow: "hidden",
            marginBottom: "16px"
          }}
          inputRef={textAreaRef}
          onInput={handleResize}
        />
      </CardContent>

      {isExpanded && (
        <CardActions
          style={{
            position: "absolute",
            bottom: "0px",
            right : "0px",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          {/* Archive Button */}
          <IconButton color="primary" onClick={() => console.log("Note Archived")}>
            <ArchiveIcon />
          </IconButton>

          {/* Delete Button */}
          <IconButton color="secondary" onClick={() => console.log("Note Deleted")}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};