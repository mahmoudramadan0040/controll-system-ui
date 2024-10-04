import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAG_TYPES } from './tags'; // Import the shared tags
const API_URL = process.env.API_URL;

export const apiDepartmentSlice = createApi({
  reducerPath:"apiDepartment",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [TAG_TYPES.DEPARTMENTS,TAG_TYPES.STUDENTS],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    // Define your API endpoints here
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: [TAG_TYPES.DEPARTMENTS]
    }),
    getDepartment: builder.query({
        query: (id) => `/departments/department/${id}`,
        
    }),
    
    getDepartmentStudents: builder.query({
        query: (id) => `/departments/department/${id}/students`,
        
    }),
    getDepartmentSubjects: builder.query({
        query: (id) => `/departments/department/${id}/subjects`,
        
    }),
    getDepartmentReport : builder.query({
        query: () => `/departments/report`,
    }),
    createDepartment: builder.mutation({
        query:(name)=>({
                url:`/departments/department`,
                method:'POST',
                body:{name}
        }),
        invalidatesTags: [TAG_TYPES.DEPARTMENTS],
    }),
    addDepartmentSubject: builder.mutation({
        query:({departmentId,subjectIds})=>({
            url:`/departments/department/${departmentId}/subjects`,
            method:'POST',
            body:subjectIds
        }),
    }),
    addDepartmentStudents: builder.mutation({
        query:({departmentId,studentIds})=>({
            url:`/departments/department/${departmentId}/students`,
            method:'POST',
            body:studentIds
        }),
        invalidatesTags: [{ type: TAG_TYPES.STUDENTS, id: 'LIST' }]
    }),
    updateDepartment:builder.mutation({
        query:({id,name})=>({
            url:`/departments/department/${id}`,
            method:'PUT',
            body:{name}
        }),
        invalidatesTags: [TAG_TYPES.DEPARTMENTS],
    }),
    deleteDepartment:builder.mutation({
        query:(id)=>({
            url:`/departments/department/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: [TAG_TYPES.DEPARTMENTS],
    }),
    deleteDepartmentSubject:builder.mutation({
        query:({departmentId,subjectId})=>({
            url:`/departments/department/${departmentId}/subject`,
            method:'DELETE',
            body:subjectId
        }),
        invalidatesTags: [TAG_TYPES.DEPARTMENTS,TAG_TYPES.SUBJECTS],
    }),
    deleteDepartmentStudents:builder.mutation({
        query:({departmentId,studentIds})=>({
            url:`/departments/department/${departmentId}/students`,
            method:'DELETE',
            body:studentIds
        }),
        invalidatesTags: [TAG_TYPES.DEPARTMENTS],
    }),
    
  }),
});

export const { 
    useGetDepartmentsQuery,
    useGetDepartmentQuery,
    useGetDepartmentStudentsQuery,
    useGetDepartmentSubjectsQuery,
    useGetDepartmentReportQuery,
    useCreateDepartmentMutation,
    useAddDepartmentStudentsMutation,
    useAddDepartmentSubjectMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useDeleteDepartmentStudentsMutation,
    useDeleteDepartmentSubjectMutation 
} = apiDepartmentSlice;
export default apiDepartmentSlice;