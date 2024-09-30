import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.API_URL;

export const apiDepartmentSlice = createApi({
  reducerPath:"apiDepartment",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Departments'],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    // Define your API endpoints here
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Departments']
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
        invalidatesTags: ['Departments'],
    }),
    addDepartmentSubject: builder.mutation({
        query:({departmentId,subjectId})=>({
            url:`/departments/department/${departmentId}/subject/${subjectId}`,
            method:'POST',
        })
    }),
    addDepartmentStudents: builder.mutation({
        query:({departmentId,studentIds})=>({
            url:`/departments/department/${departmentId}/students`,
            method:'POST',
            body:studentIds
        })
    }),
    updateDepartment:builder.mutation({
        query:({id,name})=>({
            url:`/departments/department/${id}`,
            method:'PUT',
            body:{name}
        }),
        invalidatesTags: ['Departments'],
    }),
    deleteDepartment:builder.mutation({
        query:(id)=>({
            url:`/departments/department/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['Departments'],
    }),
    deleteDepartmentSubject:builder.mutation({
        query:({departmentId,subjectId})=>({
            url:`/departments/department/${departmentId}/subject`,
            method:'DELETE',
            body:subjectId
        }),
        invalidatesTags: ['Departments'],
    }),
    deleteDepartmentStudents:builder.mutation({
        query:({departmentId,studentIds})=>({
            url:`/departments/department/${departmentId}/students`,
            method:'DELETE',
            body:studentIds
        })
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