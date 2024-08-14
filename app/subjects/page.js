
"use client"
import ModifiedDepartment from "../department/Components/ModeifiedDepartmentComponent";
import SubjectTable from './components/SubjectTableCompoent';
function Subject() {

    const components = { "component1":SubjectTable,"component2": ModifiedDepartment}
    const msgs= {"show":"Show Subjects","modeified":"Modified Subjects"}
    return ( 
            <>
                {/* <ToolBarComponent Components={components} Msg={msgs}></ToolBarComponent> */}
                <SubjectTable></SubjectTable>
            </>
            
    );
}

export default Subject;