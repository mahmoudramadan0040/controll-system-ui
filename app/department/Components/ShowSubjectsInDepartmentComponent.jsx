import {Chip} from "@nextui-org/react";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import TableIcons from "../../Components/TableData/TableIconsComponent"
import { useGetDepartmentSubjectsQuery } from "@/app/Redux/slices/Department_Slice_API";
function ShowSubjectInDepartment(props) {

    const {data:studentData,isLoading,isFetching,isError} = useGetDepartmentSubjectsQuery(
        props.id, {
            selectFromResult: (result) => {
                result.data = result.currentData ? result.data.map(({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore }) => ({ id, name, subject_Code,creditHours,isGeneralSubject,maxScore,maxSemesterScore })) : []
                return result;
            },
        }
    );
    return (
        <div>

        </div>
    );
}

export default ShowSubjectInDepartment;