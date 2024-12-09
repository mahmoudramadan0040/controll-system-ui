"use client"
import CustomNategaReport from "./components/CustomNategaReportComponent";
import { Suspense , lazy } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
const SelectStudent = lazy(() => import('../grade/Components/SelectStudentComponent'));
const SelectSubject = lazy(() => import('../grade/Components/SelectSubjectComponent'));
import ReportSteps from "./components/ReportStepsComponent";
import { useSelector, useDispatch } from 'react-redux'
function Report() {

    const StepState = useSelector((state)=> state.shared.ReportSteps);
   
    return ( 
        <div>
            {   
                StepState != 2 ? 
                <ReportSteps></ReportSteps>:''
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
                        <SelectStudent IsReport={true} selectMultiple={true}></SelectStudent>  
                    </Suspense>
                : StepState == 1 ? 
                    <Suspense fallback={
                    <div className="flex justify-center items-center h-screen mt-5 ">
                        <Stack spacing={2} direction="row" alignItems="center" >
                            <CircularProgress size="8rem" color="inherit"/>
                        </Stack>
                    </div> 
                    }>
                        <SelectSubject IsReport={true}></SelectSubject>  
                    </Suspense>
                : StepState == 2 ?
                
                <Suspense fallback={
                    <div className="flex justify-center items-center h-screen mt-5 ">
                    <Stack spacing={2} direction="row" alignItems="center" >
                        <CircularProgress size="8rem" color="inherit"/>
                    </Stack>
                    </div> 
                }>
                        <CustomNategaReport></CustomNategaReport>  
                </Suspense> : ''



                }
        </div>
     );
}

export default Report;