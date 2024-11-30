import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { archives, archive, updateNote } from "../../utils/Api";
import { Note as NoteIcon } from '@mui/icons-material';
import { trash } from "../../utils/Api";
import './Archive.scss'

let Archive=()=>{
let [archiveData, setArchiveData] = useState([]);

useEffect(()=>{
(async()=>{
    let response = await archives();
    if(response.status==200)
        setArchiveData(response.data.data);
})()},[])

let unArchive=async(data)=>{
await archive(data._id);
setArchiveData((prevNotes) => {
        return prevNotes.filter((note) => note._id !== data._id);
  });
}

let trashNote = async (data) => {
    await trash(data._id);
    setArchiveData((prevNotes) => {
      return prevNotes.filter((note) => note._id !== data._id);
  }); 
};


let handleColor = async(newColor, id) => {
  await updateNote(id, {color:newColor});
  setArchiveData((prevNotes) => {
    return prevNotes.map((note) => 
      note._id === id ? { ...note, color: newColor } : note
    );
  });
};

return(
    <>
      {
       archiveData.length

        ?archiveData.map((note) => (
        <Note key={note._id} data={note} unArchive={unArchive} handleColor={handleColor} trashNote={trashNote}/>
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

export default Archive;