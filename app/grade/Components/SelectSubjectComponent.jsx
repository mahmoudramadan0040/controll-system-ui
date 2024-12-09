
"use client"
import {
  MaterialReactTable,
  useMaterialReactTable,
  
} from 'material-react-table';
import TableIcons from "../../Components/TableData/TableIconsComponent";
import {useMemo,useState,useEffect} from "react";
import SnackbarComponent from '@/app/Components/SnackbarComponent';
import {Select, SelectItem,Chip} from "@nextui-org/react";
import {Box,Button} from "@mui/material"
import { useGetDepartmentsQuery,useGetDepartmentSubjectsQuery } from '@/app/Redux/slices/Department_Slice_API';
import { useDispatch } from 'react-redux'
import {setSelectedSubject,ChangeGradeSteps,ChangeReportSteps} from "../../Redux/slices/SharedSlice";

function SelectSubject({IsReport,selectMultiple}) {
    const dispatch = useDispatch();
    const [selectedDepartment,setDepartment]=useState(null);
    const [selectDepartmentErr , setSelectDepartmentErr] = useState(false);
    const [selectStudentErr , setSelectStudentErr] = useState(false);

    const { data: departments, isLoading:isLoadingDepartment, isFetching:isFechingDepartment, isError:IsErrorDepartment  } = useGetDepartmentsQuery(undefined, {
        selectFromResult: (result) => {
          result.data = result.currentData ? result.data.map(({ id, name }) => ({ id, name })) : []
          return result;
        },
    });

    
    const {data:subjects,isLoading:isloadingSubjects ,isFetching:isfetchingSubjects,isError:isErrorSubjects} = useGetDepartmentSubjectsQuery(
        selectedDepartment, {
            skip: !selectedDepartment,
            selectFromResult: (result) => {
                result.data = result.currentData ?
                result.data.map(({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore }) => ({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore })) : []
                return result;
            },
          }
    );


    

    
    const TableData= useMemo(()=>subjects,[subjects.length,isfetchingSubjects]);

    const TableCoulmns = useMemo(()=>[
        {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 80,
        },
        {
            accessorKey:'name',
            header:"Name",
        },
        {
            accessorKey:'subject_Code',
            header:"Subject Code",
        },
        {
            accessorKey:"creditHours",
            header:"Credit Hours",
        },
        {
            accessorKey:"isGeneralSubject",
            header:"General Subject",
            Cell:({cell})=>(
                <Chip color={cell.getValue() ? "primary":"success" } variant="shadow"   >{cell.getValue()? "General":"specialty"}</Chip>
            ),
        },
        {
            accessorKey:"maxScore",
            header:"Max Score ",
        },
        {
            accessorKey:"maxSemesterScore",
            header:"Max Semester Score",
        }
    ]);
    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    const HandelSelectSubjectFromDepartment =(table) =>{
        setSelectStudentErr(false);
        setSelectDepartmentErr(false);
     

        // const selectedRows = table.getSelectedRowModel().flatRows;
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectStudentErr(true);
            
            return;
        }
        if(selectedDepartment==null){
            setSelectDepartmentErr(true);
            return;
        } 
        const SelectedSubject = table.getSelectedRowModel().flatRows[0].original;



        dispatch(setSelectedSubject(SelectedSubject));
    
        IsReport ? dispatch(ChangeReportSteps(2)):dispatch(ChangeGradeSteps(2));      
    }

    const handelBack =() =>{
        IsReport ? dispatch(ChangeReportSteps(0)):dispatch(ChangeGradeSteps(0));   
    }
    const table = useMaterialReactTable({
        columns:TableCoulmns,
        data:TableData,
        icons:TableIcons(),
        enableEditing: false,
        enableRowSelection: true,
        enableMultiRowSelection:selectMultiple,
        muiToolbarAlertBannerProps: isloadingSubjects
        ? {color: 'error',children: 'Error loading data',}: undefined,
        muiTableContainerProps: {sx: { minHeight: '500px',backgroundColor:"#2F2F2F",color:"#fff",},},
        // body 
        muiTableBodyCellProps:{sx: {backgroundColor:"#2F2F2F",color:"#fff",border:"solid 1px #F5F7F8"},},
        //  header 
        muiTopToolbarProps:{sx: {backgroundColor:"#2F2F2F",color:"#fff",},},
        //  header 
        muiTableHeadCellProps:{sx: {backgroundColor:"#45474B",color:"#fff",border:"solid 1px #F5F7F8",fontSize:"1em",},},
        muiTablePaperProps:{sx: {backgroundColor:"#2F2F2F",color:"#1976D2",},},
        muiColumnActionsButtonProps:{sx: {color:"#ffffff",},},
        muiBottomToolbarProps:{sx: {backgroundColor:"#2F2F2F",color:"#fff",},},
        muiTablePaperProps:{sx: {border:"solid #1A2130 8px"},},

        renderTopToolbarCustomActions: ({ table  }) => (
        <Box
            sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
            }}
        >
            <Button  variant="contained" className="h-10" onClick={()=>HandelSelectSubjectFromDepartment(table)} disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() || selectedDepartment==null } >
                Next Step
            </Button>
            <Button  variant="contained" color="error" className="h-10 " onClick={()=>handelBack(table)} >
                Back
            </Button>
            
            <Select radius="sm" label="Departments" onChange={handleChange} isDisabled={isLoadingDepartment && isFechingDepartment && IsErrorDepartment} labelPlacement="outside" placeholder="Select a Department " className="max-w-xs">
            
                { (!isLoadingDepartment && !isFechingDepartment && !IsErrorDepartment) ? 
                
                    departments.map((department)=>(
                        <SelectItem key={department.id} value={department.id}>
                            {department.name}
                        </SelectItem> 
                    ))
                :"" }
                
            </Select>
        </Box>
        ),
        state: {
            isLoading: isloadingSubjects,
            showAlertBanner: isErrorSubjects,
            showProgressBars: isfetchingSubjects,
            density:"compact"
        },
   

    });


    return ( 
        <div className="grid grid-cols-12 h-auto m-12">
        <div className="col-start-1 col-span-12 text-center">
            <MaterialReactTable table={table}></MaterialReactTable>
            {selectDepartmentErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Department ! "></SnackbarComponent>:""}
            {selectStudentErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Students ! "></SnackbarComponent>:""}
            {/* {!isLoadingDepartmentStudents && !isErrorDepartmentsStudents ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Students Subscribe Department Successfully !"></SnackbarComponent>:"" } */}
            {/* {!isLoadingDeleteDepartmentStudents && !isErrorDeleteDepartmentsStudents ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Students Un Subscribe Department Successfully !"></SnackbarComponent>:""} */}
        </div>
    </div>
     );
}

export default SelectSubject;