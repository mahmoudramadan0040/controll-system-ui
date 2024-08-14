import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.API_URL;

export const apiGradeSlice = createApi({
    reducerPath:"apiGrade",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
      // Define your API endpoints here
      getStudentGrades: builder.query({
        query: (studentId) => `grades/student/${studentId}`,
      }),
      getStudentGradeInSubject:builder.query({
          query: (subjectId,studentId) => `/grades/grade/student/${studentId}/subject/${subjectId}`,
      }),
      
      addGradeStudent: builder.mutation({
          query:(student)=>({
              url:`/grades`,
              method:'POST',
              body:{student}
          })
      }),
      
      deleteStudentGrade:builder.mutation({
          query:({subjectId,studentId})=>({
              url:`/grades/student/${studentId}/subject/${subjectId}`,
              method:'DELETE',
          })
      }),
      // other endpoints...
    }),
  });
  
  export const { 
      useGetStudentGradesQuery,
      useGetStudentGradeInSubjectQuery,
      useAddGradeStudentMutation,
      useDeleteStudentGradeMutation
   } = apiGradeSlice;
