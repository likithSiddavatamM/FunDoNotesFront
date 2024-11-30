import axios from "axios"

export const loginApiCall = async(email, password)=>{
  try{
    const accessToken = (await axios.post("http://localhost:3000/api/v1/fundonotes/user/login",
      {email: email, password: password})).data.accessToken
    
    if(accessToken)
      localStorage.setItem('accessToken', accessToken);
    return accessToken
  }catch(error){
    console.log(error)
  }
}

export const fetchNotes = async () => {
   try {
      const response = await axios.get("http://localhost:3000/api/v1/fundonotes/usernotes/", {
       headers: {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
       },
     });
     return response
   } catch (error) {
     console.error("There was an error fetching the notes:", error);
   }
 }

export const registerUser = async(firstName, lastName, email, password)=>{
   try {
      const response = await axios.post("http://localhost:3000/api/v1/fundonotes/user",
        {firstName: firstName, lastName: lastName, email: email, password: password});
      return response.data.code
    } catch (error) {
      console.error("Error creating user:", error);
    }    
}

export const createNote = async(newNote)=>{
  try {
    const response = await axios.post("http://localhost:3000/api/v1/fundonotes/usernotes/", newNote,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response
   } catch (error) {
     console.error("Error creating user:", error);
   }    
}

export const archives = async()=>{
  try {
    const response = await axios.get("http://localhost:3000/api/v1/fundonotes/usernotes/archive/archives",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response
   } catch (error) {
     console.error("Error creating user:", error);
   }    
}

export const archive = async(id)=>{
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/fundonotes/usernotes/${id}/archive`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response,"---------------------------")
    return response
   } catch (error) {
     console.error("Error archiving note:", error);
   }    
}

export const trashBins = async()=>{
  try {
    const response = await axios.get("http://localhost:3000/api/v1/fundonotes/usernotes/trash/trashbin",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return response
   } catch (error) {
     console.error("Error creating user:", error);
   }    
}

export const trash = async(id)=>{
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/fundonotes/usernotes/${id}/trash`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response,"---------------------------")
    return response
   } catch (error) {
    console.error("Error trashing note:", error);
  }    
}

export const deleteForever = async(id)=>{
  try {
    const response = await axios.delete(`http://localhost:3000/api/v1/fundonotes/usernotes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response,"---------------------------")
    return response
   } catch (error) {
    console.error("Error deletePermantely note:", error);
  }    
}

export const updateNote = async (id, data) => {
  try {
    console.log(id , "*********", data)
     const response = await axios.put(`http://localhost:3000/api/v1/fundonotes/usernotes/${id}`, data ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
      },
    });
    return response
  } catch (error) {
    console.error("There was an error updating the notes:", error);
  }
}