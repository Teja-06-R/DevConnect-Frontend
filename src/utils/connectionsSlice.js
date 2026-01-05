import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice=createSlice({
    name:'connections',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>{
            return action.payload;
        },
        removeConnection:(state,action)=>{
            const newArray=state.filter((con)=>con._id!==action.payload);
            return newArray;
        }
    }
})

export const{addConnections,removeConnection}=connectionsSlice.actions;
export default connectionsSlice.reducer;