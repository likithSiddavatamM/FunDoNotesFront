import { useContext, useEffect, useState } from "react";
import { Note } from "../Note/Note";
import { trashBins } from "../../utils/Api";
import './TrashBin.scss'
import { NoNote } from "../NoNote/NoNote";
import { SearchQueryContext } from "../Search/Search";

let Trash=()=>{
  let [trashBin, setTrashBin] = useState([]);
  const searchQuery=useContext(SearchQueryContext)
  const status = ["unTrash", "deletePermantly"]
  useEffect(()=>{
  (async()=>{
      let response = await trashBins();
      if((response.status==200)&&(searchQuery==""))
          setTrashBin(response.data.data);
      else
      setTrashBin(
        response.data.data.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  })()},[searchQuery])

  let handleAction=async(action, actionData)=>{
    setTrashBin((prevNotes) => {
      return prevNotes.filter((note) => note._id !== actionData);
    });
  }

  return(
    <>
      {
       trashBin.length
        ?trashBin.map((note) => (
        <Note key={note._id} data={note} handleAction={handleAction} status={status}/>
        )) 
        :<NoNote/>
      }
    </>
  )
}

export default Trash;