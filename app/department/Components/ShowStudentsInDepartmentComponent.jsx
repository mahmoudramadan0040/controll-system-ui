"use client"
import { useGetDepartmentStudentsQuery } from "@/app/Redux/slices/Department_Slice_API";
import {Chip} from "@nextui-org/react";
import { useMemo } from "react";
import {

    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import TableIcons from "../../Components/TableData/TableIconsComponent"
function ShowStudentsInDepartment(props) {

    const {data:studentData,isLoading,isFetching,isError} = useGetDepartmentStudentsQuery(
        props.id, {
            selectFromResult: (result) => {
              result.data = result.currentData ? 
              result.data.map((
                { 
                student_id,
                fullname,
                studentStatus,
                graduated,
                studentContraint ,
                createdDate
                }) => ({ student_id,fullname,studentStatus,graduated,studentContraint ,createdDate})) : []
              return result;
            },
          }
    );
    const formatDate = (cell) =>{
        const date = new Date(cell);
        return date.toISOString().split('T')[0]; // Get the date part only
    }
    const TableData =useMemo(()=>studentData,[studentData.length]);
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
            accessorKey:"studentStatus",
            header:"Status",
        },
        {
            accessorKey:"createdDate",
            header:"Created Date",
            Cell:({cell})=>(
                cell.getValue() ? formatDate(cell.getValue()):cell.getValue()
            ),
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
        }
    ]);
    const table = useMaterialReactTable({
        columns:TableCoulmns,
        data:TableData,
        icons:TableIcons(),
        enableRowSelection: true,
        muiToolbarAlertBannerProps: isLoading
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

        state: {
            isLoading: isLoading,
            isSaving: isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            density:"compact"
          },
        });
    return (
        <div>
            <MaterialReactTable table={table}></MaterialReactTable>
        </div> 
    );
}

export default ShowStudentsInDepartment;