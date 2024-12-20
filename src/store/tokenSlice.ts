import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface Itoken {
        email:string,
        age:string,
        name:string,
        islogin:boolean
}
const initialState : Itoken = {
    email: "",
    name: "",
    age: "",
    islogin:false,
}
const tokenSlice = createSlice({
    name:"tokens",
    initialState,
    reducers:{
        getToken:(state)=>{
            let decode = localStorage.getItem("token")
            if(decode !== null){
                const decodetoken:Itoken = jwtDecode(decode)
                state.email = decodetoken.email
                state.age = decodetoken.age
                state.name = decodetoken.name
                state.islogin = true
            }else{
                state.islogin = false
            }
        }
    }
})

export const{getToken} = tokenSlice.actions
export default tokenSlice.reducer