"use client"

import { useMemo } from 'react';
import { object, string } from 'yup';
import { useGetDepartmentsQuery, useCreateDepartmentMutation,useUpdateDepartmentMutation,useDeleteDepartmentMutation } from '@/app/Redux/slices/Department_Slice_API';
import { useSelector, useDispatch } from 'react-redux'
import {setValidationErrors,clearValidationErrors} from "../../Redux/slices/SharedSlice";
import TableModifiedComponent from "../../Components/TableData/TableModifiedComponent";

function ModifiedDepartment() {
  const validationErrors = useSelector((state)=> state.shared.validationErrors);
  const dispatch = useDispatch();
  // ------------------------------------------------------------------------//
  //                          validation Data                               //
  // ----------------------------------------------------------------------//
  const validationSchema = object({
    name: string().required("department name is required")
      .min(6, "Name must be at least 6 chracters long")
  })

  // ------------------------------------------------------------------------//
  //          Operation Api [ Get - Create -  Delete - Update ]             //
  // ----------------------------------------------------------------------//
  const { data: departments, isLoading:isLoadingDepartment, isFetching:isFechingDepartment, isError:IsErrorDepartment  } = useGetDepartmentsQuery(undefined, {
    selectFromResult: (result) => {
      result.data = result.currentData ? result.data.map(({ id, name }) => ({ id, name })) : []
      return result;
    },
  });
  const [createDepartment, { isLoading: isCreatingDepartment }] = useCreateDepartmentMutation();
  const [updatedepartment ,{ isLoading: isUpdatingDepartment}] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading:isDeletingDepartment}] = useDeleteDepartmentMutation();

  
  

  const TableData = useMemo(() => departments, [departments.length])
  const TableCoulmns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Department Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      }], [validationErrors],
  );

  // ------------------------------------------------------------------------//
  //          Handel Action  [ Create -  Delete - Update ]                  //
  // ----------------------------------------------------------------------//
  const handelCreateDepartment = async ({ values, table }) => {
    try {
      const { name } = values

      await validationSchema.validate({ name }, { abortEarly: false })
      createDepartment(name);
      setValidationErrors({})
      table.setCreatingRow(null); //exit creating mode
      // refetch();
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setValidationErrors(formattedErrors);
    }
  }

  const handelEditDepartment = async ({ values, table }) => {
    try {
      const { id,name } = values
      await validationSchema.validate({ name }, { abortEarly: false })
      updatedepartment(values);
      dispatch(clearValidationErrors());
      table.setEditingRow(null); //exit Editing mode
    } catch (validationErrors) {
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
        isLoading:isLoadingDepartment,
        isCreatingLoading:isCreatingDepartment,
        isError:IsErrorDepartment,
        isFetching:isFechingDepartment,
    },
    HandelCreate:handelCreateDepartment,
    HandelDelete:deleteDepartment,
    HandelEdit:handelEditDepartment,
    Msg:{
        EditMsg:"",
        CreateMsg:"create new Department",
        DeleteMsg:"Are you Sure Delete this Department !",
        Info:"Department Information"
    }
  }

  return (
    <div>
        <TableModifiedComponent information={information}></TableModifiedComponent>
    </div>

  );
}



export default ModifiedDepartment;