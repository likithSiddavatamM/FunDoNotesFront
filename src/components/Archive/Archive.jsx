import { useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { archives } from "../../utils/Api";
import './Archive.scss'
import { NoNote } from "../NoNote/NoNote";

let Archive=()=>{
let [archiveData, setArchiveData] = useState([]);
const status = ["unArchive", "unTrash", "alert", "personAdd", "imageAdd", "colorPalette","moreVert"];
useEffect(()=>{
(async()=>{
    let response = await archives();
    if(response.status==200)
        setArchiveData(response.data.data);
})()},[])

const handleAction=async(action, actionData)=>{
  switch (action) {
    case "color" :
      setArchiveData((prevNotes) => {
        return prevNotes.map((note) => 
          {return note._id == actionData[0] ? { ...note, color: actionData[1] } : note}
        );
      });
      break;

    case "unArchive":
    case "unTrash":
      setArchiveData((prevNotes) => {
        return prevNotes.filter((note) => note._id != actionData);
      });

  }
}

return(
    <>
      {
       archiveData.length

        ?archiveData.map((note) => (
        <Note key={note._id} data={note} handleAction={handleAction} status={status}/>
        )) 
      
        : <NoNote/>
      }
    </>
  )
}

export default Archive;