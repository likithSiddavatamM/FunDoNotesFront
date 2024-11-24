import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { createNote, fetchNotes } from "../../utils/Api";
import { Note as NoteIcon } from '@mui/icons-material';
import TakeNote from "../TakeNote/TakeNote";

import './Notes.scss'
export const Notes=()=>{
  const [notes, setNotes] = useState([]);
  
  const handleAddNote = async (newNote) => {
    try {
      console.log(newNote.title ,"+++++++", newNote.description)

      let createNoteResponse = await createNote(newNote)
      if(createNoteResponse.data.code)
        setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  useEffect(() => {
    (async()=>{
      let userData = await fetchNotes();
      console.log(userData)
      console.log(notes)
      if(userData && userData.data)
        setNotes(userData.data)
    })()
  }, []);
  
  return(
    <>
      <span style={{width: "100%", display: "flex", position: "relative", justifyContent: "center", alignItems: "start", top:"0px" }}>
      <TakeNote onAddNote={handleAddNote}/>
      </span>
      {
       notes.length

        ?notes.map((note, index) => (
        <Note key={index} data={note}/>
        )) 
      
        :<div className="Notes-no-notes-display">
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
      }
    </>
  )
}
