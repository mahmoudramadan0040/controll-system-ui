// apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.API_URL;

export const apiStudentSlice = createApi({
  reducerPath:"apiStudent",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // Define your API endpoints here
    getStudents: builder.query({
      query: () => '/students',
    }),
    getStudent: builder.query({
      query: (studentId) => `/students/student/${studentId}`,
    }),
    filterStudent:builder.query({
      query: ({filter}) => ({
        url:`students/filter`,
        params:filter
      })
    }),
    addStudent:builder.mutation({
      query:(student)=>({
        url:`/students/student`,
        method:'POST',
        body:{student}
      })
    }),
    ImportStudents:builder.mutation({
      query:(file)=>({
        url:`/students/import`,
        method:'POST',
        body:file,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }),
    deleteStudent:builder.mutation({
      query:(studentId)=>({
        url:`/students/student/${studentId}`,
        method:'DELETE',
        
      })
    })
    
  }),
});

export const { 
  useGetStudentsQuery,
  useGetStudentQuery,
  useFilterStudentQuery,
  useAddStudentMutation,
  useImportStudentsMutation,
  useDeleteStudentMutation
 } = apiStudentSlice;


