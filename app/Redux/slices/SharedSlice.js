import { createSlice } from '@reduxjs/toolkit'


const initialState={
    DeleteDepartmentModel:false,
    validationErrors:{},
    gradeSteps:0,
    ReportSteps:0,
    selectedStudents:[],
    selectedSubject:{}
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
        },
        ChangeGradeSteps:(state,action)=>{
            state.gradeSteps=action.payload;
        },
        ChangeReportSteps:(state,action)=>{
            state.ReportSteps=action.payload;
        },
        setSelectedStudents:(state,action)=>{
            console.log(action.payload)
            console.log(action)
            state.selectedStudents=action.payload;
        },
        setSelectedSubject:(state,action)=>{
            console.log(action.payload)
            console.log(action)
            state.selectedSubject=action.payload;
        },
    }
})
export const {
    openDeleteModel,
    closeDeleteModel,
    setValidationErrors,
    clearValidationErrors,
    ChangeGradeSteps,
    ChangeReportSteps,
    setSelectedStudents,
    setSelectedSubject
} = sharedSlice.actions
export default sharedSlice.reducer