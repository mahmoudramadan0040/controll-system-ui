"use client"
import StudentTable from "./Components/StudentTableComponent";
import StudentsDepartment from "./Components/StudentsDepartmentComponent";
import StudentsSubjects from "./Components/StudentsSubjectsComponent";
// import ImportStudents from "./Components/ImportStudentsComponent";
import ToolBarComponent from "../Components/ToolBarComponent";


function Student() {

    const components = { 
        "component1": StudentTable,
        "component2": StudentsDepartment,
        "component3":StudentsSubjects,
        // "component4": ImportStudents,
    }
    const msgs= {
        "show":"Show Students",
        "Subscribe":"Add Students To Department",
        "Add Students subjects":"Add Students subjects"
    }
    return ( 
    <div>
        {/* <StudentTable/> */}
        <ToolBarComponent Components={components} Msg={msgs}  ></ToolBarComponent>
    </div>
     );
}

export default Student;