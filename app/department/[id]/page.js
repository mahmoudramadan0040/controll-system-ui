"use client"
import { useParams  } from 'next/navigation';
import ShowStudentsInDepartment from '../Components/ShowStudentsInDepartmentComponent';
function DepartmentDetails() {
    const params = useParams();
    return ( 
        <ShowStudentsInDepartment id={params.id}/>
    );
}

export default DepartmentDetails;