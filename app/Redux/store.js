// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiStudentSlice } from './slices/Student_Slice_API';
import { apiDepartmentSlice } from './slices/Department_Slice_API';
import { apiGradeSlice } from './slices/Grade_Slice_API';
import { apiSubjectSlice } from './slices/Subject_Slice_ApI';
import { apiReportsSlice } from "./slices/Report_Slice_API";
import SharedSlice from './slices/SharedSlice';
export const store = configureStore({
  reducer: {
    // Add the API slice reducer to the Redux store
    shared:SharedSlice,
    [apiStudentSlice.reducerPath]: apiStudentSlice.reducer,
    [apiDepartmentSlice.reducerPath]:apiDepartmentSlice.reducer,
    [apiGradeSlice.reducerPath]:apiGradeSlice.reducer,
    [apiSubjectSlice.reducerPath]:apiSubjectSlice.reducer,
    [apiReportsSlice.reducerPath]:apiReportsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(apiDepartmentSlice.middleware)
    .concat(apiStudentSlice.middleware)
    .concat(apiSubjectSlice.middleware)
    .concat(apiGradeSlice.middleware)
    .concat(apiReportsSlice.middleware)
    
});

// Export the hook used to access the Redux store
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);