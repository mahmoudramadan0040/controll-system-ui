import {Chip} from "@nextui-org/react";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import TableIcons from "../../Components/TableData/TableIconsComponent"
import { useGetDepartmentSubjectsQuery } from "@/app/Redux/slices/Department_Slice_API";
function ShowSubjectInDepartment(props) {

    const {data:SubjectData,isLoading,isFetching,isError} = useGetDepartmentSubjectsQuery(
        props.id, {
            selectFromResult: (result) => {
                result.data = result.currentData ? result.data.map(({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore }) => ({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore })) : []
                return result;
            },
        }
    );

    const TableData =useMemo(()=>SubjectData,[SubjectData.length]);

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
    const table = useMaterialReactTable({
        columns:TableCoulmns,
        data:SubjectData,
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

export default ShowSubjectInDepartment;