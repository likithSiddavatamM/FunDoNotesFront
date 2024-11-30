import React from "react";
import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { createNote, fetchNotes, trash ,updateNote} from "../../utils/Api";
import { Note as NoteIcon } from '@mui/icons-material';
import TakeNote from "../TakeNote/TakeNote";
import { archive } from "../../utils/Api";
import './Notes.scss'

export const Notes=()=>{
  const [notes, setNotes] = useState([]);
  const [expandedNote, setExpandedNote] = useState(null);
  // const [dummyState, setDummyState] = useState(false);

  useEffect(() => {
    (async()=>{
      let userData = await fetchNotes();
      console.log(userData)
      console.log(notes)
      if(userData && userData.data)
        setNotes(userData.data)
    })()
  }, []);
  
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

  
  const handleNoteClick = (data) => {
    console.log("in parent", data)
    setExpandedNote(data);
  };

  let handleColor = async(newColor, id) => {
    console.log("*******", id, "*****", newColor);

    await updateNote(id, {color:newColor});
    setNotes((prevNotes) => {
      return prevNotes.map((note) => 
        { console.log(note.color,"+++"); return note._id === id ? { ...note, color: newColor } : note}
      );
    });
  };

  const closePopup = async(id, updatedNote) => {
    setExpandedNote(null);
    console.log(id,"=====",updatedNote)
    await updateNote(id, updatedNote)

    setNotes((prevNotes) => {
      console.log("updatedNote Notes:", updatedNote);
      return prevNotes.map((note) => {
        if (note._id === id) {
          console.log("Updating Note:", note);
          return { ...note, ...updatedNote };
        } else {
          return note;
        }
      });
    });
    // window.location.reload()
  
  };
// const closePopup = async (id, updatedNote) => {
//   setExpandedNote(null);

//   console.log("Updating note with ID:", id, "Updated data:", updatedNote);

//   try {
//     const response = await updateNote(id, updatedNote);
//     console.log("API response:", response);

//     setNotes((prevNotes) => {
//       console.log("Before update:", prevNotes);
//       const updatedNotes = prevNotes.map((note) =>
//         note._id === id ? { ...note, ...updatedNote } : note
//       );
//       console.log("After update:", updatedNotes);
//       return updatedNotes;
//     });
//     setDummyState((prev) => !prev);
//   } catch (error) {
//     console.error("Error updating the note:", error);
//   }
// };


  
  return(
    <>
      <span style={{width: "100%", display: "flex", position: "relative", justifyContent: "center", alignItems: "start", top:"0px" }}>
      <TakeNote onAddNote={handleAddNote}/>
      </span>
      {
       notes.length

        ?notes.map((note) => (
        <Note key={note._id} data={note} archivenote={archiveNote} trashNote={trashNote} expandedNote={expandedNote} handleColor={handleColor} handleNoteClick={handleNoteClick}/>
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
      {expandedNote && (
        <div className="popup-overlay">
          <Note data={expandedNote} /*trashNote={trashNote}*/ handleColor={handleColor} closePopup={closePopup} expandedNote={expandedNote}/>
        </div>
      )}
    </>
  )
}
