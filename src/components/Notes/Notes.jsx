import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "../Note/Note";

export const Notes=()=>{
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/fundonotes/usernotes/", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM4YWE5OTNjNTNjYjEwMjQ5MTkyNDAiLCJlbWFpbCI6ImxhaGFuazE4NjQ1QGdtYWlsLmNvbSIsImlhdCI6MTczMTc2NzU5M30.Ebwrk9bs8Sq2IjipU1eAadHI_9ar8fafehUtZzsQLkE`, // Set the token in the Authorization header
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("There was an error fetching the notes:", error);
    }
  };

  useEffect(() => {
      fetchNotes();
  }, []);
  

  return(
    <>
      {
        notes.map((note, index) => (
          <Note key={index} data={note} />
        ))
      }
    </>
  )

}
