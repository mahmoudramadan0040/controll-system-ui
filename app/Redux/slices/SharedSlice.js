import { createSlice } from '@reduxjs/toolkit'


const initialState={
    DeleteDepartmentModel:false,
    validationErrors:{}
};
const sharedSlice = createSlice({
    name:"shared",
    initialState,
    reducers:{
        openDeleteModel:(state)=>{
            state.DeleteDepartmentModel=true
        },
        closeDeleteModel:(state)=>{
            state.DeleteDepartmentModel=false
        },
        setValidationErrors:(state,action)=>{
            state.validationErrors=action.payload;
        },
        clearValidationErrors:(state)=>{
            state.validationErrors={};
        }
    }
})
export const {openDeleteModel,closeDeleteModel,setValidationErrors,clearValidationErrors} = sharedSlice.actions
export default sharedSlice.reducer