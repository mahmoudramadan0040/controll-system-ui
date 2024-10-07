import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSelector } from 'react-redux'
const steps = [
    'Select Students ',
    'Choose Subjects',
    'Add Grade ',
  ];
  
function GradeSteps(props) {
    const StepState = useSelector((state)=> state.shared.gradeSteps);
    return ( 
        <div className='flex justify-center mt-3 '>
            <Box className=' bg-neutral-700 pt-3 rounded-lg' sx={{ width: '80%' }}>
                <Stepper activeStep={StepState} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            <span className='text-slate-200 font-semibold'>
                                {label}
                            </span>
                        </StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
     );
}

export default GradeSteps;