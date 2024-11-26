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
     console.error("Error creating user:", error);
   }    
}
