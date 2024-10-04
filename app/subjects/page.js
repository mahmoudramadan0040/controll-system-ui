
"use client"
import ModifiedDepartment from "../department/Components/DepartmentTableComponent";
import SubjectDepartment from "./components/SubjectDepartmentComponent";
import SubjectTable from './components/SubjectTableCompoent';
import ToolBarComponent from "../Components/ToolBarComponent";
function Subject() {

    const components = { 
            "component1":SubjectTable,
            "component2": ModifiedDepartment,
            "component3":SubjectDepartment
        }
    const msgs= {
        "show":"Show Subjects",
        "modeified":"Modified Subjects",
        "Subscribe Department":"Add Subjects To Department"
    }
    return ( 
            <>
                <ToolBarComponent Components={components} Msg={msgs} ></ToolBarComponent>
                
            </>
            
    );
}

export default Subject;