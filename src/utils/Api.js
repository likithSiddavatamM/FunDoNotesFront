import axios from "axios"

export const loginApiCall = async(email, password)=>{
   try{
   const accessToken = (await axios.post("http://localhost:3000/api/v1/fundonotes/user/login",{email: email, password: password})).data.accessToken
   localStorage.setItem('accessToken', accessToken);
   return accessToken
   }
   catch(e){
      console.log(e)
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
      const response = await axios.post("http://localhost:3000/api/v1/fundonotes/user",{firstName: firstName, lastName: lastName, email: email, password: password});
      return response.data.code
    } catch (error) {
      console.error("Error creating user:", error);
    }    
}