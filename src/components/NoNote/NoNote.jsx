import React from "react";
import { Note as NoteIcon } from '@mui/icons-material';

export const NoNote = () => {
    return(
        <div className="Notes-no-notes-display">
          <NoteIcon
            style={{
              fontSize: "50px",
              marginBottom: "20px",
              color: "#888",
            }}
            />
          <p>No notes to display</p>
          <p>
            Add some notes to display
          </p>
        </div>
    )
}