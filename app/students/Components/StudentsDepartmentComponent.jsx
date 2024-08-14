"use client"
import {
  MaterialReactTable,
  useMaterialReactTable,
  
} from 'material-react-table';
import {useMemo} from "react";
import {Chip} from "@nextui-org/react";
import TableIcons from "../../Components/TableData/TableIconsComponent";
import { useGetStudentsQuery } from '@/app/Redux/slices/Student_Slice_API';
import { useGetDepartmentsQuery,useAddDepartmentStudentsMutation,useDeleteDepartmentStudentsMutation } from '@/app/Redux/slices/Department_Slice_API';
import {Box,Button} from "@mui/material"
import { useState } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import SnackbarComponent from '@/app/Components/SnackbarComponent';
function StudentsDepartment() {
    
    const [selectedDepartment,setDepartment]=useState(null);
    const [selectDepartmentErr , setSelectDepartmentErr] = useState(false);
    const [selectStudentErr , setSelectStudentErr] = useState(false);
    // get all student from api 
    const {data:students,isLoading:isloadingStudents ,isFetching:isfetchingStudents,isError:isError} = useGetStudentsQuery(
        undefined, {
            selectFromResult: (result) => {
              result.data = result.currentData ? 
              result.data.map((
                { 
                id,
                student_id,
                student_setId,
                firstname,
                lastname,
                fullname,
                phone,
                studentStatus,
                graduated,
                studentContraint ,
                departmentId
                }) => ({ id,student_id,student_setId, firstname,lastname,fullname,phone,studentStatus,graduated,studentContraint,departmentId })) : []
              return result;
            },
          }
    );
    const { data: departments, isLoading:isLoadingDepartment, isFetching:isFechingDepartment, isError:IsErrorDepartment  } = useGetDepartmentsQuery(undefined, {
        selectFromResult: (result) => {
          result.data = result.currentData ? result.data.map(({ id, name }) => ({ id, name })) : []
          return result;
        },
    });
    const [addDepartmentStudents,{isLoading:isLoadingDepartmentStudents , isError:isErrorDepartmentsStudents}] =useAddDepartmentStudentsMutation()
    const [ deleteDepartmentStudents,{isLoading:isLoadingDeleteDepartmentStudents , isError:isErrorDeleteDepartmentsStudents} ] =useDeleteDepartmentStudentsMutation();
    
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
    
    
    const TableData= useMemo(()=>students,[students.length]);

    const TableCoulmns = useMemo(()=>[
        
        {
            accessorKey:'student_id',
            header:"Student ID",
        },
        {
            accessorKey:'student_setId',
            header:"Student Set ID",
        },
        {
            accessorKey:'fullname',
            header:"Full Name",
        },
        {
            accessorKey:"departmentId",
            header:"Department",
            Cell:({cell})=>(
                <Chip color={cell?.getValue() ? "primary":"danger" } variant="shadow">{cell?.getValue()  ? displayDepartmentName(cell?.getValue()):"Not Define"}</Chip>
            ),
            filterSelectOptions:departments.map((department)=>({"label":department?.name,"value":department?.id})),
            filterVariant: 'select',
        },
        {
            accessorKey:'firstname',
            header:"First Name",
        },
        {
            accessorKey:'lastname',
            header:"Last Name",
            
        },
        {
            accessorKey:"phone",
            header:"Phone Number",
            
        },
        {
            accessorKey:"studentStatus",
            header:"Status",
            
        },
        {
            accessorKey:"graduated",
            header:"Graduated",
            Cell:({cell})=>(
                <Chip color={cell.getValue() ? "primary":"success" } variant="shadow"   >{cell.getValue()? "False":"True"}</Chip>
            ),
        },
        {
            accessorKey:"studentContraint",
            header:"Constraint",
        },
        
        {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 80,
        },
    ]);
    // const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    const HandelAddStudentsToDepartment =(table) =>{
        setSelectStudentErr(false);
        setSelectDepartmentErr(false);
     
        console.log(table.getSelectedRowModel().flatRows);
        // const selectedRows = table.getSelectedRowModel().flatRows;
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectStudentErr(true);
            
            return;
        }
        if(selectedDepartment==null){
            setSelectDepartmentErr(true);
            return;
        } 
        const studentIds = table.getSelectedRowModel().flatRows.map((student)=>(student.original.id));
        
        // add students to selected department 
        const departmentId = selectedDepartment;
        console.log(departmentId)
        addDepartmentStudents({departmentId,studentIds})
        
    }

    const HandelRemoveStudentsFromDepartment =(table)=>{
        setSelectStudentErr(false);
        setSelectDepartmentErr(false);
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectStudentErr(true);
            return;
        }
        if(selectedDepartment==null){
            setSelectDepartmentErr(true);
            return;
        } 
        const departmentId = selectedDepartment;
        const studentIds = table.getSelectedRowModel().flatRows.map((student)=>(student.original.id));
        deleteDepartmentStudents({departmentId,studentIds})

    }
    const table = useMaterialReactTable({
        columns:TableCoulmns,
        data:TableData,
        icons:TableIcons(),
        enableEditing: false,
        enableRowSelection: true,
        muiToolbarAlertBannerProps: isloadingStudents
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
            <Button  variant="contained" className="h-10" onClick={()=>HandelAddStudentsToDepartment(table)} disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() || selectedDepartment==null } >
                Subscribe Department
            </Button>
            <Button variant="contained"  color="error" className="h-10" onClick={()=>HandelRemoveStudentsFromDepartment(table)}  disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() || selectedDepartment==null} >
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
            isLoading: isloadingStudents,
            showAlertBanner: isError,
            showProgressBars: isfetchingStudents,
            density:"compact"
        },
   

    });
    
   
    return (       
        <div className="grid grid-cols-12 h-auto m-12">
            <div className="col-start-1 col-span-12 text-center">
                <MaterialReactTable table={table}></MaterialReactTable>
                {selectDepartmentErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Department ! "></SnackbarComponent>:""}
                {selectStudentErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Students ! "></SnackbarComponent>:""}
                {!isLoadingDepartmentStudents && !isErrorDepartmentsStudents ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Students Subscribe Department Successfully !"></SnackbarComponent>:"" }
                {!isLoadingDeleteDepartmentStudents && !isErrorDeleteDepartmentsStudents ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Students Un Subscribe Department Successfully !"></SnackbarComponent>:""}
            </div>
        </div>
    );
}






export default StudentsDepartment;