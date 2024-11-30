"use client"
import { useParams  } from 'next/navigation';
import { Suspense , lazy } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';


const LoadStudentInDepartment = lazy(()=> import('../Components/ShowStudentsInDepartmentComponent'))
const LoadShowubjectInDepartment = lazy(()=> import('../Components/ShowSubjectsInDepartmentComponent'))
import {Accordion, AccordionItem} from "@nextui-org/react";
function DepartmentDetails() {
    const params = useParams();
    return ( 
        <div className='m-5'>
            
            <Accordion variant="splitted" id="firstaccordion">
                <AccordionItem key="1" id="99" aria-label="Student Table" title="Student Table">
                    
                    <Suspense fallback=
                        {
                        <div className="flex justify-center items-center h-screen mt-5 ">
                            <Stack spacing={2} direction="row" alignItems="center" >
                            <CircularProgress size="8rem" color="inherit"/>
                        </Stack>
                        </div>   
                        
                        }>
                        <LoadStudentInDepartment id={params.id}/>
                    </Suspense>
                
                </AccordionItem>

                <AccordionItem key="2" id="99" aria-label="Subject Table" title="Subject Table">
               
                {/* <Suspense fallback=
                        {
                        <div className="flex justify-center items-center h-screen mt-5 ">
                            <Stack spacing={2} direction="row" alignItems="center" >
                            <CircularProgress size="8rem" color="inherit"/>
                        </Stack>
                        </div>   
                        }>
                        <LoadShowubjectInDepartment departmentId={params.id} id="LoadShowubjectInDepartment"/>
                    </Suspense> */}
                    </AccordionItem>
            </Accordion>
           
        </div>
    );
}

export default DepartmentDetails;