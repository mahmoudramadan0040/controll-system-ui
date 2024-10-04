"use client"
import EditGradeStudent from "./Components/EditgradeStudentComponent";
// import SelectStudent from "./Components/SelectStudentComponent";
import GradeSteps from "./Components/GradeStepsComponent";
import { Suspense , lazy } from "react";
import {Spinner} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux'
const EditGradeStudents = lazy(() => import('./Components/EditgradeStudentComponent'));
const SelectStudent = lazy(() => import('./Components/SelectStudentComponent'));
const SelectSubject = lazy(()=>import('./Components/SelectSubjectComponent'));
function Grade() {

    const StepState = useSelector((state)=> state.shared.gradeSteps);

 

    return (
        <div>
            <GradeSteps></GradeSteps>
            {
             
                StepState == 0 ?  
                    <Suspense fallback={ <div className="flex flex-col items-center justify-center w-full h-full content-center "><Spinner color="default" size="lg" /></div>}>
                        <SelectStudent></SelectStudent>  
                    </Suspense>
                : StepState == 1 ? 
                    <Suspense fallback={<Spinner color="default" size="lg" />}>
                        <SelectSubject></SelectSubject>  
                    </Suspense>
                : StepState == 2 ? 
                <Suspense fallback={<Spinner color="default" size="lg" />}>
                        <EditGradeStudents></EditGradeStudents>  
                </Suspense> : ''
            }
            
        </div>
    );
}

export default Grade;