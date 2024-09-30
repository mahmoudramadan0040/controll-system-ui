"use client"

import ToolBarComponent from '../Components/ToolBarComponent';
import ShowDepartments from "./Components/ShowDepartmentComponent";
import ModifiedDepartment from "./Components/DepartmentTableComponent";
import ReportDepartment from './Components/ReportDepartmentComponent';
function Department() {
    const components = {
        "component1": ShowDepartments,
        "component2": ModifiedDepartment,
        "component3": ReportDepartment
    }
    const msgs = {
        "show": "Show Departments",
        "modeified": "Modified Departments",
        "report": "Departments Report"
    }
    return (

        <>
            <ToolBarComponent Components={components} Msg={msgs}></ToolBarComponent>
        </>

    );
}

export default Department;