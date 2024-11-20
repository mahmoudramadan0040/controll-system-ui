import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.API_URL;

export const apiGradeSlice = createApi({
  reducerPath: "apiGrade",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // Define your API endpoints here
    getStudentGrades: builder.query({
      query: (studentId) => `grades/student/${studentId}`,
    }),
    getStudentGradeInSubject: builder.query({
      query: (subjectId, studentId) =>
        `/grades/grade/student/${studentId}/subject/${subjectId}`,
    }),
    getGradesInSubject: builder.query({
      query: ({subjectId,filter={}}) =>{
        const queryString = Object.keys(filter).length 
        ? `?${new URLSearchParams(filter).toString()}` 
        : "";
        return `/grades/subject/${subjectId}${queryString}`;
      }
        
    }),

    addGradeStudent: builder.mutation({
      query: ({grade,subjectId}) => {
        console.log("Subject ID:", subjectId);
        console.log("Grade:", grade);
        return {
          url: `/grades/${subjectId}`,
          method: "PUT",
          body: [grade],
        };  
      }
    //     {
    //     url: `/grades/${subjectId}`,
    //     method: "PUT",
    //     body: { grade },
    //     }
    // ),
    }),

    deleteStudentGrade: builder.mutation({
      query: ({ subjectId, studentId }) => (
        {
        url: `/grades/student/${studentId}/subject/${subjectId}`,
        method: "DELETE",
      }),
    }),
    // other endpoints...
  }),
});

export const {
  useGetStudentGradesQuery,
  useGetStudentGradeInSubjectQuery,
  useGetGradesInSubjectQuery,
  useAddGradeStudentMutation,
  useDeleteStudentGradeMutation,

} = apiGradeSlice;
