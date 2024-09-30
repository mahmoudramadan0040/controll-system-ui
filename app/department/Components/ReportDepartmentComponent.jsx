"use-client"
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useGetDepartmentReportQuery } from '@/app/Redux/slices/Department_Slice_API'; 
function ReportDepartment() {
    const { data: reportdata, isError, isLoading, isFetching } = useGetDepartmentReportQuery();
    console.log(reportdata);
    const NumberOfStudentInEachDepartment =(!isFetching && !isLoading && !isError) ?  reportdata.map(department => ({
        id:department.departmentId,
        value:department.numberOfStudents,
        label:department.departmentName
    })):[];
    const NumberOfSubjectInEachDepartment = (!isFetching && !isLoading && !isError) ? reportdata.map(department => ({
        id:department.departmentId,
        value:department.numberOfSubjects,
        label:department.departmentName
    })):[];

    console.log(NumberOfSubjectInEachDepartment);
    console.log(NumberOfStudentInEachDepartment);

    return ( 
    <div>
         <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />
    
    {(!isFetching && !isLoading && !isError) ? <PieChart
      series={[
        {
          data: NumberOfStudentInEachDepartment,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          
        },
      ]}
      width={600}
      height={200}
      
    />:""}
    {(!isFetching && !isLoading && !isError) ? <PieChart
      series={[
        {
          data: NumberOfSubjectInEachDepartment,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          
        },
      ]}
      height={200}
      width={400}
    />:""}
    </div>


    );
}

export default ReportDepartment;


