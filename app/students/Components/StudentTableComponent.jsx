
"use client"
import { useSelector, useDispatch } from 'react-redux'
import {  useMemo } from 'react';
import React, { Suspense, lazy } from 'react';
import {Chip} from "@nextui-org/react";
import { boolean, object, string } from 'yup';
import {setValidationErrors,clearValidationErrors} from "../../Redux/slices/SharedSlice";
import { 
    useGetStudentsQuery,
    useGetStudentQuery,
    useDeleteStudentMutation,
    useAddStudentMutation,
    useImportStudentsMutation } from '@/app/Redux/slices/Student_Slice_API';
// import TableModifiedComponent from "../../Components/TableData/TableModifiedComponent";
import {Spinner} from "@nextui-org/react";
const TableModifiedComponent = lazy(() => import('../../Components/TableData/TableModifiedComponent'));
function StudentTable() { 
    const dispatch = useDispatch();
    const validationErrors = useSelector((state)=> state.shared.validationErrors);

    // get all student from api 
    const {data:students=[],isLoading:isloadingStudents ,isFetching:isfetchingStudents,isError:isError} = useGetStudentsQuery(
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
                studentContraint 
                }) => ({ id,student_id,student_setId, firstname,lastname,fullname,phone,studentStatus,graduated,studentContraint })) : []
              return result;
            },
          }
    );

    const [createStudent,{isLoading:isCreatingStudent,isError:isCreatingErrStudent }] =useAddStudentMutation();
    const [deleteStudent,{isLoading:isDeletingStudent,isError:isDeletingErrStudent}] = useDeleteStudentMutation();

    // ------------------------------------------------------------------------//
    //                          validation Data                               //
    // ----------------------------------------------------------------------//
    const validationSchema = object({
        student_id: string().required("Student Id Name is required !").min(6, "Student Id must be at least 6 chracters long"),
        student_setId:string().required("student setId Code is required !").min(1,"student_setId  must be at least 1 numbers long"),
        firstname:string().required("firstname is required !"),
        lastname:string().required("firstname is required !"),
        fullname:string().required("firstname is required !"),
        phone: string().required("phone is required !"),
        graduated:boolean().required("graduated is required !"),
        studentStatus:string().oneOf(['First', 'Second', 'Third', 'Forth']).required(),
        studentContraint:string().oneOf(["Fresh", "RemainingOne", "RemainingTwo", "FirstChance", "SecondChance"]).required()
    })
  
    const TableData= useMemo(()=>students,[students.length]);
    const TableCoulmns = useMemo(()=>[
        {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 80,
        },
        {
            accessorKey:'student_id',
            header:"Student ID",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.student_id,
                helperText: validationErrors?.student_id,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,student_id: undefined,})),
            },
        },
        {
            accessorKey:'student_setId',
            header:"Student Set ID",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.student_setId,
                helperText: validationErrors?.student_setId,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,student_setId: undefined,})),
            },
        },
        {
            accessorKey:'fullname',
            header:"Full Name",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.fullname,
                helperText: validationErrors?.fullname,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,fullname: undefined,})),
            },
        },
        {
            accessorKey:'firstname',
            header:"First Name",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.firstname,
                helperText: validationErrors?.firstname,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,firstname: undefined,})),
            },
        },
        {
            accessorKey:'lastname',
            header:"Last Name",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.lastname,
                helperText: validationErrors?.lastname,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,lastname: undefined,})),
            },
        },
        {
            accessorKey:"phone",
            header:"Phone Number",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.phone,
                helperText: validationErrors?.phone,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,phone: undefined,})),
            },
        },
        {
            accessorKey:"studentStatus",
            header:"Status",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.studentStatus,
                helperText: validationErrors?.studentStatus,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,studentStatus: undefined,})),
            },
        },
        {
            accessorKey:"graduated",
            header:"Graduated",
            Cell:({cell})=>(
                <Chip color={cell.getValue() ? "primary":"success" } variant="shadow"   >{cell.getValue()? "False":"True"}</Chip>
            ),
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.graduated,
                helperText: validationErrors?.graduated,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,graduated: undefined,})),
            },
        },
        {
            accessorKey:"studentContraint",
            header:"Constraint",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.studentContraint,
                helperText: validationErrors?.studentContraint,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,studentContraint: undefined,})),
            },
        }
    ]);
    const HandelCreateStudent = async ({values,table})=>{
        try{
            const {
                firstname,
                lastname,
                fullname,
                student_id,
                student_setId,
                phone,
                studentStatus,
                graduated,
                studentContraint
            } = values;
            await validationSchema.validate({firstname, lastname,fullname,student_id,student_setId,phone,graduated,studentContraint,studentStatus},{ abortEarly: false })
            
            var bodyFormData = new FormData();
            Object.entries({firstname,
                lastname,
                fullname,
                student_id,
                student_setId,
                phone,
                studentStatus,
                graduated:Boolean(graduated),
                studentContraint}
            ).forEach(([key, value]) => {
                bodyFormData.append(key, value);
            });
            await createStudent(bodyFormData);
            dispatch(clearValidationErrors());
            table.setCreatingRow(null);
        }catch(validationErrors){
            const formattedErrors = validationErrors.inner.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
              }, {});

  
              dispatch(setValidationErrors(formattedErrors));
        }
    }

    const HandelEditStudent = async ({values,table})=>{

    }
    const information ={
        validationErrors,
        data:TableData,
        columns:TableCoulmns,
        IntialState:{
            isLoading:isloadingStudents,
            isCreatingLoading:isCreatingStudent,
            isError:isError,
            isFetching:isfetchingStudents,
        },
        HandelCreate:HandelCreateStudent,
        HandelDelete:deleteStudent,
        HandelEdit:HandelEditStudent,
        Msg:{
            EditMsg:"Edit student information",
            CreateMsg:"create new Student",
            DeleteMsg:"Are you Sure Delete Student",
            Info:"Student Information"
        }
    }
    return ( 
        <Suspense fallback={<Spinner color="default" size="lg" />}>
            <TableModifiedComponent suppressHydrationWarning={true}  information={information} ></TableModifiedComponent>
        </Suspense>
    );
}

export default StudentTable;