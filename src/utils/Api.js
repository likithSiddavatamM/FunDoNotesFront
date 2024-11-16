import axios from "axios"

export const loginApiCall = ()=>{
   return axios.post("http://localhost:3000/api/v1/fundonotes/user/login",{email:"likith.isekit2020@gmail.com",password:"kkkkkjkjk"})
}