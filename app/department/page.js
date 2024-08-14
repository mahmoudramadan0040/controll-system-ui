"use client"

import ToolBarComponent from '../Components/ToolBarComponent';
import ShowDepartments from "./Components/ShowDepartmentComponent";
import ModifiedDepartment from "./Components/ModeifiedDepartmentComponent";

function Department() {
    const components = {
        "component1": ShowDepartments,
        "component2": ModifiedDepartment
    }
    const msgs = {
        "show": "Show Departments",
        "modeified": "Modified Departments"
    }
    return (

        <>
            <ToolBarComponent Components={components} Msg={msgs}></ToolBarComponent>
        </>

    );
}

export default Department;