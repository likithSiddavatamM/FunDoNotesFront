import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { fetchNotes, updateNote} from "../../utils/Api";
import TakeNote from "../TakeNote/TakeNote";
import './Notes.scss'
import { NoNote } from "../NoNote/NoNote";
import { SearchQueryContext } from "../Search/Search";

export const Notes=()=>{
  const [expandedNote, setExpandedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const searchQuery=useContext(SearchQueryContext)
  const status = ["archive", "trash", "alert", "personAdd", "imageAdd", "colorPalette", "moreVert"];

  useEffect(() => {
    (async () => {
      const userData = await fetchNotes();
      console.log(searchQuery, "ssdsd");
      if (userData && userData.data && searchQuery === "") {
        setNotes(userData.data.data);
      } else if (userData && userData.data) {
        setNotes(
          userData.data.data.filter(
            (note) =>
              note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    })();
  }, [searchQuery]);

  const handleNoteClick = (data) => {
    setExpandedNote(data);
  };


  const handleAction=async(action, actionData)=>{
    switch(action){
      case "add" :
        setNotes((prevNotes) => [...prevNotes, actionData]);
      case "color" :
        setNotes((prevNotes) => {
          return prevNotes.map((note) => 
            { return note._id == actionData[0] ? { ...note, color: actionData[1] } : note}
          );
        });
      case "archive":
      case "trash":
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => note._id != actionData)
        });
    }
  }

  const closePopup = async(id, updatedNote) => {
    await updateNote(id, updatedNote)
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note._id === id) 
          return { ...note, ...updatedNote };
        else 
          return note; 
      });
    });
    setExpandedNote(null);
  };

  return(
    <>
      <span  className="centered-span" >
      <TakeNote handleAction={handleAction}/>
      </span>
      {
       notes.length

        ?notes.map((note, index) => (
          <Note key={note._id || index} data={note} expandedNote={expandedNote} handleNoteClick={handleNoteClick} handleAction={handleAction} status={status}/>
        ))
        
      
        :<NoNote/>
      }
      {expandedNote && (
        <div className="popup-overlay">
          <Note data={expandedNote} closePopup={closePopup} expandedNote={expandedNote} status={status}/>
        </div>
      )}
    </>
  )
}
