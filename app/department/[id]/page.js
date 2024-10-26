"use client"
import { useParams  } from 'next/navigation';
import ShowStudentsInDepartment from '../Components/ShowStudentsInDepartmentComponent';
import ShowSubjectInDepartment from '../Components/ShowSubjectsInDepartmentComponent';
import {Accordion, AccordionItem} from "@nextui-org/react";
function DepartmentDetails() {
    const params = useParams();
    return ( 
        <div className='m-5'>
            
            <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Student Table" title="Student Table">
                <ShowStudentsInDepartment id={params.id}/>
            </AccordionItem>
            </Accordion>
            <br></br>
            <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Subject Table" title="Subject Table">
                <ShowSubjectInDepartment id={params.id}/>
            </AccordionItem>
            </Accordion>
        </div>
    );
}

export default DepartmentDetails;