import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { fetchNotes } from "../../utils/Api";
import TakeNote from "../TakeNote/TakeNote";
import './Notes.scss'
import { NoNote } from "../NoNote/NoNote";
import { SearchQueryContext } from "../Search/Search";

export const Notes=()=>{
  const [expandedNote, setExpandedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const searchQuery=useContext(SearchQueryContext)
  const status = ["archive", "trash", "alert", "personAdd", "imageAdd", "colorPalette", "moreVert", "noteClick"];

  useEffect(() => {
    (async () => {
      const userData = await fetchNotes();
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

  const handleAction=async(action, actionData)=>{
    switch(action){
      case "add" : setNotes((prevNotes) => [...prevNotes, actionData]);
                   break
      case "color" : setNotes((prevNotes) => {
                        return prevNotes.map((note) => 
                          { return note._id == actionData[0] ? { ...note, color: actionData[1] } : note}
                        );
                      });
                      break
      case "archive":
      case "trash": setNotes((prevNotes) => {
                      return prevNotes.filter((note) => note._id != actionData)
                    });
                    break;
      case "editNote" : setNotes((prevNotes) => {
                        return prevNotes.map((note) => {
                          if (note._id === actionData.editNote._id) 
                            return { ...note, ...actionData.note };
                          else 
                            return note; 
                        });
                      });
                      setExpandedNote(null);  
                      break
      case "deleteEditNote" :               
      case "archiveEditNote": setNotes((prevNotes) => {
                                return prevNotes.filter((note) => note._id != actionData)
                              });
                              setExpandedNote(null);
                              break;
      case "noteClick" : setExpandedNote(actionData);
    }
  }

 return (
    <>
      {expandedNote ? (
        <>
          <div className="popup-overlay">
            <TakeNote
              key={expandedNote._id}
              handleAction={handleAction}
              editNote={expandedNote}
            />
          </div>
          <span className="centered-span">
            <TakeNote handleAction={handleAction} />
          </span>
          {notes.length ? (
            notes.map((note, index) => (
              <Note
                key={note._id || index}
                data={note}
                handleAction={handleAction}
                status={status}
              />
            ))
          ) : (
            <NoNote />
          )}
        </>
    
        ) : (
          
        <>
          <span className="centered-span">
            <TakeNote handleAction={handleAction} />
          </span>
          {notes.length ? (
            notes.map((note, index) => (
              <Note
                key={note._id || index}
                data={note}
                expandedNote={expandedNote}
                handleAction={handleAction}
                status={status}
              />
            ))
          ) : (
            <NoNote />
          )}
        </>
      )}
    </>
  );
}
