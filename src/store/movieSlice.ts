import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface movieState{
    movies:{id:string,name:string,desc:string,img:string,url?:string}[]
}
const initialState:movieState = {
    movies:[{id:"1",name:"herry",desc:"dddd",img:"dddd"},
        {id:"2",name:"varry",desc:"vvv",img:"vvv"}
    ]
}
const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        addMovie:(state,action:PayloadAction<{id:string,name:string,desc:string,img:string}>)=>{
            state.movies.push(action.payload)
        },

    }

})

export const{addMovie} = movieSlice.actions
export default movieSlice.reducer