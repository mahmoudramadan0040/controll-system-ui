
"use client"
import {
    MaterialReactTable,
    useMaterialReactTable,
    
  } from 'material-react-table';
import {useState,useMemo} from 'react';
import { useGetStudentsQuery } from '@/app/Redux/slices/Student_Slice_API';
import { useGetSubjectsQuery ,useEnrollStudentsInSubjectsMutation , useUnrollStudentFromSubjectMutation } from '@/app/Redux/slices/Subject_Slice_ApI';
import { useGetDepartmentsQuery } from '@/app/Redux/slices/Department_Slice_API';
import TableIcons from "../../Components/TableData/TableIconsComponent";
import {Chip} from "@nextui-org/react";
import {Box,Button, AlertTitle} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Suspense , lazy } from "react";
import SnackbarComponent from '@/app/Components/SnackbarComponent';


const loadStudentTable = lazy(({StudentTable,selectStudentErr})=>(
    <div className='w-full h-full mr-4 ml-3'>   
                    
        <MaterialReactTable table={StudentTable} className="w-screen " ></MaterialReactTable>
        {selectStudentErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Students ! "></SnackbarComponent>:""}
               
    </div>
))
function StudentsSubjects() {

    const [isVisible, setIsVisible] = useState(true);
    const [studentsSelected,setSelectedStudents] = useState({});
    const [subjectsSelected,setSelectedSubjects] = useState({});
    const [selectSubjectErr , setSelectSubjectErr] = useState(false);
    const [selectStudentErr , setSelectStudentErr] = useState(false);
    // get all student from api
    const {data:students,isLoading:isloadingStudents ,isFetching:isfetchingStudents,isError:isErrorStudents} = useGetStudentsQuery(
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
    // get all subject from api 
    const {data:subjects,isLoading:isloadingSubjects ,isFetching:isfetchingSubject,isError:isErrorSubjects}=useGetSubjectsQuery(
        undefined, {
            selectFromResult: (result) => {
              result.data = result.currentData ? result.data.map(({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore }) => ({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore })) : []
              return result;
            },
          }
    );
    // get all department from api 
    const { data: departments, isLoading:isLoadingDepartment, isFetching:isFechingDepartment, isError:IsErrorDepartment  } = useGetDepartmentsQuery(undefined, {
        selectFromResult: (result) => {
          result.data = result.currentData ? result.data.map(({ id, name }) => ({ id, name })) : []
          return result;
        },
    });

    const [enrollStudentInSubject,{isLoading:isLoadingStudentEnrollSubjects, isError:isErrorStudentEnrollSubjects }] = useEnrollStudentsInSubjectsMutation();
    const HandelSelectedStudents  = (table) =>{
        setSelectedStudents({});
        console.log(table.getSelectedRowModel().flatRows);
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectStudentErr(true);
            return;
        }
        const studentIds = table.getSelectedRowModel().flatRows.map((student)=>(student.original.id));
        
        setSelectedStudents(studentIds);
        console.log(studentsSelected);
        setIsVisible(false);
    }
    const SubscribeStudentToSubjects = (table) =>{
        setSelectedSubjects({});
        if(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()){
            setSelectSubjectErr(true);
            return;
        }
        const subjectIds = table.getSelectedRowModel().flatRows.map((subject)=>(subject.original.id));
        setSelectedSubjects(subjectIds);
        console.log(subjectIds)

        if(studentsSelected && subjectsSelected )
        {
            console.log("inside");
            enrollStudentInSubject({"studentIds":studentsSelected,"subjectIds":subjectsSelected});
        }
        setIsVisible(false);



    }


    
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
    const TableStudentsData= useMemo(()=>students,[students.length]);
    const TableSubjectsData= useMemo(()=>subjects,[subjects.length]);

    const TableStudentsCoulmns = useMemo(()=>[
        {
            accessorKey:'student_id',
            header:"Student ID",
            size: 100, //decrease the width of this column
            
        },
        {
            accessorKey:'student_setId',
            header:"Student Set ID",
            size: 100, //decrease the width of this column
        },
        {
            accessorKey:'fullname',
            header:"Full Name",
            
            size: 300, //decrease the width of this column
        },
        {
            accessorKey:"departmentId",
            header:"Department",
            Cell:({cell})=>(
                <Chip color={cell?.getValue() ? "primary":"danger" } variant="shadow">{cell?.getValue()  ? displayDepartmentName(cell?.getValue()):"Not Define"}</Chip>
            ),
            filterSelectOptions:departments.map((department)=>({"label":department?.name,"value":department?.id})),
            filterVariant: 'select',
            size: 200,
        },
        {
            accessorKey:"studentStatus",
            header:"Status",
            size: 100, //decrease the width of this column
            
        },
        {
            accessorKey:"studentContraint",
            header:"Constraint",
        },
        {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            // size:200,
            grow: true
        },
    ]);
    const TableSubjectColumns = useMemo(()=>[
        {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 50,
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
    ])


    
    
    // --------------------------------------------------------------------------//
    //                       Student Table                                      //
    // ------------------------------------------------------------------------//
    const StudentTable = useMaterialReactTable({
        columns:TableStudentsCoulmns,
        data:TableStudentsData,
        icons:TableIcons(),
        enableEditing: false,
        enableRowSelection: true,
        enableColumnResizing: true,
        layoutMode: 'grid',
        muiToolbarAlertBannerProps: isloadingStudents
        ? {color: 'error',children: 'Error loading data',}: undefined,
        muiTableContainerProps: {sx: { minHeight: '300px',backgroundColor:"#2F2F2F",color:"#fff",},},
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
        <Box className="flex flex-row"
            sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
            }}
        >
            
            <Button  onClick={()=>HandelSelectedStudents(table)} variant="contained" disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() && isVisible} className="h-10 w-64 text-3xl"  >
                Next
            </Button>
            
        </Box>
        ),
        state: {
            isLoading: isloadingStudents,
            showAlertBanner: isErrorStudents,
            showProgressBars: isfetchingStudents,
            density:"compact"
        },
   

    });



    // --------------------------------------------------------------------------//
    //                       Subject Table                                      //
    // ------------------------------------------------------------------------//
    const SubjectTable = useMaterialReactTable({
        columns:TableSubjectColumns,
        data:TableSubjectsData,
        icons:TableIcons(),
        enableEditing: false,
        enableRowSelection: true,
        enableColumnResizing: true,
        layoutMode: 'grid',
        muiToolbarAlertBannerProps: isloadingStudents
        ? {color: 'error',children: 'Error loading data',}: undefined,
        muiTableContainerProps: {sx: { minHeight: '300px',backgroundColor:"#2F2F2F",color:"#fff",},},
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
             <Button 
             onClick={()=>(setIsVisible(true))} 
             variant="contained" 
             disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() && isVisible} color="error" className="h-10 w-64 text-2xl"  >
                Back
            </Button>
            <Button  onClick={()=>SubscribeStudentToSubjects(table)} 
            variant="contained" 
            disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() || isVisible} className="h-10 w-64 text-3xl"  >
                Subscribe
            </Button>
           
        </Box>
        ),
        state: {
            isLoading: isloadingStudents,
            showAlertBanner: isErrorStudents,
            showProgressBars: isfetchingStudents,
            density:"compact"
        },
   

    });
    
    return (
        <>
            {/* <div style={{ width: '199vw' ,scrollbarWidth: 'none' }} className={`w-full flex nowrap transition-transform ease-in-out duration-1000 transform ${isVisible ? 'translate-x-0' :'-translate-x-1/2 ' }`} > */}
                
                {isVisible  ? 
                    
                    <Suspense fallback=
                    {
                        <div className="flex justify-center items-center h-screen mt-5 ">
                            <Stack spacing={2} direction="row" alignItems="center" >
                                <CircularProgress size="8rem" color="inherit"/>
                            </Stack>
                        </div>   
                    }>
                        <div className='w-full h-full mr-4 ml-3'>   
                            <MaterialReactTable table={StudentTable} className="w-screen " ></MaterialReactTable>
                            {selectStudentErr ? <SnackbarComponent vertical="top" horizontal="left" type="error"  msg="Please Select Students ! "></SnackbarComponent>:""}
                        </div>
                    </Suspense>
                :
                <Suspense fallback=
                    {
                        <div className="flex justify-center items-center h-screen mt-5 ">
                            <Stack spacing={2} direction="row" alignItems="center" >
                                <CircularProgress size="8rem" color="inherit"/>
                            </Stack>
                        </div>   
                    }>
                    <div className='w-full h-full ml-3'>   
                        
                        <MaterialReactTable table={SubjectTable}  className="w-screen" ></MaterialReactTable>
                        {!isLoadingStudentEnrollSubjects && !isErrorStudentEnrollSubjects && studentsSelected.length>0 && subjectsSelected.length>0 ? <SnackbarComponent vertical="top" horizontal="left" type="success"  msg="Students Subscribe Subjects Successfully !"></SnackbarComponent>:"" }
                    </div>
                </Suspense>
                }
                
                
                
            {/* </div> */}
        
        
        
        </>
        
    );
}


export default StudentsSubjects;