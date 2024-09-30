"use client"
import { useState, useMemo } from 'react';
import { 
    useGetSubjectQuery,
    useGetSubjectsQuery,
    useCreateSubjectMutation,
    useDeleteSubjectMutation,
    useUpdateSubjectMutation
} from '@/app/Redux/slices/Subject_Slice_ApI';
import {Chip} from "@nextui-org/react";
import { boolean, number, object, string } from 'yup';
import TableModifiedComponent from "../../Components/TableData/TableModifiedComponent";
import { useSelector, useDispatch } from 'react-redux'
import {setValidationErrors,clearValidationErrors} from "../../Redux/slices/SharedSlice";
function SubjectTable() {
    
    const dispatch = useDispatch();
    const validationErrors = useSelector((state)=> state.shared.validationErrors);
    
    // get all subject from api 
    const {data:subjects,isLoading:isloadingSubjects ,isFetching:isfetchingSubject,isError:isError}=useGetSubjectsQuery(
        undefined, {
            selectFromResult: (result) => {
              result.data = result.currentData ? result.data.map(({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore }) => ({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore })) : []
              return result;
            },
          }
    );
    const [createSubject,{isLoading:isCreatingSubject,isError:isErrorCreatingSubject}] = useCreateSubjectMutation();
    const [deleteSubject,{isLoading:isDeletingSubject,isError:isErrorDeletingSubject}] = useDeleteSubjectMutation();
    const [updateSubject,{isLoading:isUpdatingSubject,isError:isErrorUpdateSubject}]=useUpdateSubjectMutation();


    // ------------------------------------------------------------------------//
    //                          validation Data                               //
    // ----------------------------------------------------------------------//

    const validationSchema = object({
        name: string().required("Subject Name is required !").min(6, "Name must be at least 6 chracters long"),
        subject_Code:string().required("subject Code is required !").min(3,"subject Code must be at least 3 numbers long"),
        creditHours:number("credit Hours must be number").required("credit Hours is required !"),
        isGeneralSubject:boolean(" general subject should be 0 for false 1 for true !").required("Is General Subject is required !"),
        maxScore:number("max score must be number !").required("Max Score  is required !"),
        maxSemesterScore:number("max semester score must be number !").required("Max Semester Score  is required !"),
    })

    const TableData= useMemo(()=>subjects,[subjects.length]);

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
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.name,
                helperText: validationErrors?.name,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,name: undefined,})),
            },
        },
        {
            accessorKey:'subject_Code',
            header:"Subject Code",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.subject_code,
                helperText: validationErrors?.subject_code,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,subject_code: undefined,})),
            },
        },
        {
            accessorKey:"creditHours",
            header:"Credit Hours",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.creditHours,
                helperText: validationErrors?.creditHours,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,creditHours: undefined,})),
            },
        },
        {
            accessorKey:"isGeneralSubject",
            header:"General Subject",
            Cell:({cell})=>(
                <Chip color={cell.getValue() ? "primary":"success" } variant="shadow"   >{cell.getValue()? "General":"specialty"}</Chip>
            ),
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.isGeneralSubject,
                helperText: validationErrors?.isGeneralSubject,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,isGeneralSubject: undefined,})),
            },
        },
        {
            accessorKey:"maxScore",
            header:"Max Score ",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.maxScore,
                helperText: validationErrors?.maxScore,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,maxScore: undefined,})),
            },
        },
        {
            accessorKey:"maxSemesterScore",
            header:"Max Semester Score",
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.maxSemesterScore,
                helperText: validationErrors?.maxSemesterScore,
                onFocus: () =>dispatch(setValidationErrors({...validationErrors,maxSemesterScore: undefined,})),
            },
        }
    ]);
    
    

    // create subject 
    const HandelCreateSubject = async ({values,table}) =>{
        try{
            
            const { name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore} = values;
            
            await validationSchema.validate({name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore},{ abortEarly: false })

            //  cast value from text to number and boolean 
            
            const convertValues = {
                "name":name,
                "subject_Code":subject_Code,
                "creditHours":parseInt(creditHours),
                "isGeneralSubject":Boolean(isGeneralSubject),
                "maxScore":parseInt(maxScore),
                "maxSemesterScore":parseInt(maxSemesterScore)
            }
            createSubject(convertValues);
            dispatch(clearValidationErrors());
            table.setCreatingRow(null);
        }catch (validationErrors) {
            console.log(validationErrors);
            const formattedErrors = validationErrors.inner.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
            }, {});
            console.log(formattedErrors);

            dispatch(setValidationErrors(formattedErrors));
        }
    }

    const HandelEditSubject = async ({values,table})=>{
        try{
            
            const { id,name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore} = values;
            await validationSchema.validate({name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore},{ abortEarly: false })
            const convertValues = {
                "id":id,
                "name":name,
                "subject_Code":subject_Code,
                "creditHours":parseInt(creditHours),
                "isGeneralSubject":Boolean(isGeneralSubject),
                "maxScore":parseInt(maxScore),
                "maxSemesterScore":parseInt(maxSemesterScore)
            }
            updateSubject(convertValues);
            dispatch(clearValidationErrors());
            table.setEditingRow(null);
        }catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
            }, {});
            dispatch(setValidationErrors(formattedErrors));
        }
    }



    const information ={
        validationErrors,
        data:TableData,
        columns:TableCoulmns,
        IntialState:{
            isLoading:isloadingSubjects,
            isCreatingLoading:isCreatingSubject,
            isError:isError,
            isFetching:isfetchingSubject,
        },
        HandelCreate:HandelCreateSubject,
        HandelDelete:deleteSubject,
        HandelEdit:HandelEditSubject,
        Msg:{
            EditMsg:"",
            CreateMsg:"create new Subject",
            DeleteMsg:"Are you Sure Delete Subject",
            Info:"Subject Information"
        }
    }
    return (  
        <div>
            <TableModifiedComponent information={information}></TableModifiedComponent>
        </div>
    );
}

export default SubjectTable;



