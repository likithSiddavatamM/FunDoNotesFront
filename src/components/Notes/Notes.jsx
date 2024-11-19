import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { fetchNotes } from "../../utils/Api";
import { Note as NoteIcon } from '@mui/icons-material';

import './Notes.scss'
export const Notes=()=>{
  const [notes, setNotes] = useState([]);
  
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
