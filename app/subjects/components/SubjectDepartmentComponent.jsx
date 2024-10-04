"use client"
import {
  MaterialReactTable,
  useMaterialReactTable,
  
} from 'material-react-table';
import {useMemo} from "react";
import {Chip} from "@nextui-org/react";
import TableIcons from "../../Components/TableData/TableIconsComponent";
import { useGetSubjectsQuery } from '@/app/Redux/slices/Subject_Slice_ApI';
import { useGetDepartmentsQuery,useDeleteDepartmentSubjectMutation ,useAddDepartmentSubjectMutation } from '@/app/Redux/slices/Department_Slice_API';
import {Box,Button} from "@mui/material"
import { useState } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import SnackbarComponent from '@/app/Components/SnackbarComponent';
function SubjectDepartment() {
    
    const [selectedDepartment,setDepartment]=useState(null);
    const [selectDepartmentErr , setSelectDepartmentErr] = useState(false);
    const [selectSubjecttErr , setSelectSubjectErr] = useState(false);
    // get all Subjects from api 
    const {data:Subject,isLoading:isloadingSubjects ,isFetching:isfetchingSubjects,isError:isErrorSubjects} = useGetSubjectsQuery(
        undefined, {
            selectFromResult: (result) => {
                result.data = result.currentData ? result.data.map(({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore }) => ({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore })) : []
                return result;
            },
          }
    );
    // get all Depatment from api 
    const { data: departments, isLoading:isLoadingDepartment, isFetching:isFechingDepartment, isError:IsErrorDepartment  } = useGetDepartmentsQuery(undefined, {
        selectFromResult: (result) => {
          result.data = result.currentData ? result.data.map(({ id, name }) => ({ id, name })) : []
          return result;
        },
    });
    const [addSubjectsToDepartment,{isLoading:isLoadingDepartmentSubject, isError:isErrorDepartmentsSubject}] =useAddDepartmentSubjectMutation()
    const [ deleteSubjectFromDepartment,{isLoading:isLoadingDeleteDepartmentSubject , isError:isErrorDeleteDepartmentSubject} ] =useDeleteDepartmentSubjectMutation();
    
    const displayDepartmentName = (departmentId) =>{
        if(departmentId){
            return departments.map((department)=>{
                if(department.id == departmentId )
                    return department.name;
            });
        }else{
            return null;
        }
    }
    
    
    const TableData= useMemo(()=>Subject,[Subject.length]);

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
    // const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    const HandelAddSubjectsToDepartment =(table) =>{
        setSelectSubjectErr(false);
        setSelectDepartmentErr(false);
     
        console.log(table.getSelectedRowModel().flatRows);
        // const selectedRows = table.getSelectedRowModel().flatRows;
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectSubjectErr(true);
            return;
        }
        if(selectedDepartment==null){
            setSelectDepartmentErr(true);
            return;
        } 

        const subjectIds = table.getSelectedRowModel().flatRows.map((subject)=>(subject.original.id));
        
        // add students to selected department 
        const departmentId = selectedDepartment;
        addSubjectsToDepartment({departmentId,subjectIds})
        
    }

    const HandelRemoveSubjectsFromDepartment =(table)=>{
        setSelectSubjectErr(false);
        setSelectDepartmentErr(false);
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectSubjectErr(true);
            return;
        }
        if(selectedDepartment==null){
            setSelectDepartmentErr(true);
            return;
        } 
        const departmentId = selectedDepartment;
        const subjectId = table.getSelectedRowModel().flatRows.map((subject)=>(subject.original.id));
        deleteSubjectFromDepartment({departmentId,subjectId})

    }
    const table = useMaterialReactTable({
        columns:TableCoulmns,
        data:TableData,
        icons:TableIcons(),
        enableEditing: false,
        enableRowSelection: true,
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
            <Button  variant="contained" className="h-10" onClick={()=>HandelAddSubjectsToDepartment(table)} disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() || selectedDepartment==null } >
                Subscribe Department
            </Button>
            <Button variant="contained"  color="error" className="h-10" onClick={()=>HandelRemoveSubjectsFromDepartment(table)}  disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() || selectedDepartment==null} >
                UnSubscribe Department
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
                {selectSubjecttErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Subject ! "></SnackbarComponent>:""}
                {!isLoadingDepartmentSubject && !isErrorDepartmentsSubject ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Subjects Subscribe Department Successfully !"></SnackbarComponent>:"" }
                {!isLoadingDeleteDepartmentSubject && !isErrorDeleteDepartmentSubject ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Subject Un Subscribe Department Successfully !"></SnackbarComponent>:""}
            </div>
        </div>
    );
}






export default SubjectDepartment;