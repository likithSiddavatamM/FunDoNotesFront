import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { createNote, fetchNotes, trash } from "../../utils/Api";
import { Note as NoteIcon } from '@mui/icons-material';
import TakeNote from "../TakeNote/TakeNote";
import { archive } from "../../utils/Api";
import './Notes.scss'

export const Notes=()=>{
  const [notes, setNotes] = useState([]);
  
  const handleAddNote = async (newNote) => {
    try {
      let createNoteResponse = await createNote(newNote)
      if(createNoteResponse.data.code)
        setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  let archiveNote = async (data) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note._id !== data._id);
    });
    await archive(data._id);
  };

  let trashNote = async (data) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note._id !== data._id);
    });
    await trash(data._id);
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

        ?notes.map((note) => (
        <Note key={note._id} data={note} archivenote={archiveNote} trashNote={trashNote}/>
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
