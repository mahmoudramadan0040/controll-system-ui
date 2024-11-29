import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAG_TYPES } from './tags'; // Import the shared tags
const API_URL = process.env.API_URL;

export const apiReportsSlice = createApi({
  reducerPath:"apiReports",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    // Define your API endpoints here
    getNategaReport: builder.query({
        query: ({departmentId,studentStatus,subjectIds}) => {
            let url = `reports/natega/${departmentId}/${studentStatus}`;

            if(subjectIds && subjectIds.length >0){
                const reportWithParam = subjectIds.map(id => `subjectIds=${id}`).join('&');
                url += `?${reportWithParam}`;
            }

            return url;

        },
    }),
    getSubjectsReport: builder.query({
        query: ({departmentId,studentStatus,subjectIds}) => {
            let url = `reports/subject-report/${departmentId}/${studentStatus}`;

            if(subjectIds && subjectIds.length >0){
                const reportWithParam = subjectIds.map(id => `subjectIds=${id}`).join('&');
                url += `?${reportWithParam}`;
            }

            return url;
        },
    }),
    
    
    
    
  }),
});

export const { 
    useGetNategaReportQuery,
    useGetSubjectsReportQuery,
    
} = apiReportsSlice;
export default apiReportsSlice;