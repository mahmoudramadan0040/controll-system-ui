import {Card, CardHeader, CardBody, CardFooter ,Divider, Button} from "@nextui-org/react";
import SnackbarComponent from '../../Components/SnackbarComponent';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useGetDepartmentsQuery } from "@/app/Redux/slices/Department_Slice_API";
import style from "./show.module.css";
function ShowDepartments() {
    const { data: departmentsData, isError, isLoading, isFetching } = useGetDepartmentsQuery();
    console.log(departmentsData)
    return ( 
        
        <div className="flex flex-row flex-wrap justify-center m-2">
            {
                isLoading ? 
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                > 
                    <CircularProgress color="inherit" />
                </Backdrop>
                : ''
            }
            {
                (!isLoading && !isFetching && !isError) ?
                <SnackbarComponent type="success" vertical="top" horizontal="left" msg="department display successfully ! "></SnackbarComponent>:'' 
            }
            {   
                isError ? <SnackbarComponent type="error" vertical="top" horizontal="left" msg="oops. can't display departments !"></SnackbarComponent>:''
            }
            {departmentsData ? departmentsData.map((department)=>(
                <Card className={`${style.showDepartment} max-w-[400px] m-2`} key={department.id}>
                    <CardHeader className="justify-center">
                        {department.name}
                    </CardHeader>
                    <Divider/>
                    <Divider/>
                    <CardFooter className="flex justify-center">
                        <Button>
                            more details 
                        </Button>
                    </CardFooter>
                </Card>
            )):''}
           
        </div>
    );
}

export default ShowDepartments;