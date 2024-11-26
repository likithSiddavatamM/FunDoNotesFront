import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { trashBins, trash } from "../../utils/Api";
import { Note as NoteIcon } from '@mui/icons-material';
import './TrashBin.scss'

let Trash=()=>{
let [trashBin, setTrashBin] = useState([]);

useEffect(()=>{
(async()=>{
    let response = await trashBins();
    if(response.status==200)
        setTrashBin(response.data.data);
})()},[])

let unTrash=async(data)=>{
await trash(data._id);
setTrashBin((prevNotes) => {
        return prevNotes.filter((note) => note._id !== data._id);
  });
}

return(
    <>
      {
       trashBin.length

        ?trashBin.map((note) => (
        <Note key={note._id} data={note} unTrash={unTrash}/>
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

export default Trash;