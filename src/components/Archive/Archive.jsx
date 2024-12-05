import { useContext, useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { archives } from "../../utils/Api";
import './Archive.scss'
import { NoNote } from "../NoNote/NoNote";
import { SearchQueryContext } from "../Search/Search";

let Archive=()=>{
let [archiveData, setArchiveData] = useState([]);
const searchQuery=useContext(SearchQueryContext)
const status = ["unArchive", "unTrash", "alert", "personAdd", "imageAdd", "colorPalette","moreVert"];
useEffect(()=>{
(async()=>{
    let response = await archives();
    if((response.status==200)&&(searchQuery==""))
      setArchiveData(response.data.data);
    else
    setArchiveData(
      response.data.data.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
})()},[searchQuery])

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