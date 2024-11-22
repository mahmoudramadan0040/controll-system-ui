"use client"
import EditGradeStudent from "./Components/EditgradeStudentComponent";
// import SelectStudent from "./Components/SelectStudentComponent";
import GradeSteps from "./Components/GradeStepsComponent";
import { Suspense , lazy } from "react";
import {Spinner} from "@nextui-org/react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux'
const EditGradeStudents = lazy(() => import('./Components/EditgradeStudentComponent'));
const SelectStudent = lazy(() => import('./Components/SelectStudentComponent'));
const SelectSubject = lazy(()=>import('./Components/SelectSubjectComponent'));

function Grade() {

    const StepState = useSelector((state)=> state.shared.gradeSteps);

    return (
        <div>
            {   
                StepState != 2 ? 
                <GradeSteps></GradeSteps>:''
            }
            {
             
                StepState == 0 ?  
                    <Suspense fallback=
                    {
                    <div className="flex justify-center items-center h-screen mt-5 ">
                        <Stack spacing={2} direction="row" alignItems="center" >
                        <CircularProgress size="8rem" color="inherit"/>
                      </Stack>
                    </div>   
                    
                    }>
                        <SelectStudent></SelectStudent>  
                    </Suspense>
                : StepState == 1 ? 
                    <Suspense fallback={
                    <div className="flex justify-center items-center h-screen mt-5 ">
                        <Stack spacing={2} direction="row" alignItems="center" >
                            <CircularProgress size="8rem" color="inherit"/>
                        </Stack>
                    </div> 
                    }>
                        <SelectSubject></SelectSubject>  
                    </Suspense>
                : StepState == 2 ? 
                <Suspense fallback={
                    <div className="flex justify-center items-center h-screen mt-5 ">
                    <Stack spacing={2} direction="row" alignItems="center" >
                        <CircularProgress size="8rem" color="inherit"/>
                    </Stack>
                    </div> 
                }>
                        <EditGradeStudents></EditGradeStudents>  
                </Suspense> : ''
            }
            
            {/* <EditGradeStudents></EditGradeStudents>  */}
            
        </div>
    );
}

export default Grade;