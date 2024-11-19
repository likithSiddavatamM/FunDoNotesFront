import "./Note.scss";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, IconButton, TextField, CardActions } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

export const Note = ({ data }) => {
  const { title: initialTitle, description: initialDescription } = data;

  const [note, setNote] = useState({
    title: initialTitle || "Default Title",
    description: initialDescription || "Default description text",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textAreaRef = useRef(null);

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

  useEffect(() => {
    handleResize();
  }, [note.description]);

  return (
    <Card
      className="note-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        paddingBottom: "50px",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <CardContent>
        {/* Title */}
        <TextField
          placeholder="Title"
          fullWidth
          value={note.title}
          onChange={handleTitleChange}
          variant="outlined"
          style={{ marginBottom: "16px" }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Description */}
        <TextField
          placeholder="Description"
          fullWidth
          value={note.description}
          onChange={handleDescriptionChange}
          variant="outlined"
          multiline
          rows={1}
          style={{
            resize: "none",
            minHeight: "50px",
            overflow: "hidden",
            marginBottom: "16px",
          }}
          inputRef={textAreaRef}
          onInput={handleResize}
        />
      </CardContent>

      {isHovered && (
        <CardActions
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
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
