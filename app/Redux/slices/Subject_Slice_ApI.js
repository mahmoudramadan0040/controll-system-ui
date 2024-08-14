import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.API_URL;

export const apiSubjectSlice = createApi({
    reducerPath:"apiSubject",
    tagTypes: ['Subjects'],
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
    // Define your API endpoints here
        getSubjects: builder.query({
            query: () => '/subjects',
            providesTags: ['Subjects']
        }),
        getSubject:builder.query({
            query: (subjectId) => `/subjects/subject/${subjectId}`,
        }),
        getSubjectStudent:builder.query({
            query: (subjectId) => `/subjects/subject/${subjectId}/students`,
        }),
        createSubject: builder.mutation({
            
            query:(student)=>({
                url:`/subjects/subject`,
                method:'POST',
                body:{...student}
                
            }),
            invalidatesTags: ['Subjects'],
        }),
        enrollStudentsInSubjects: builder.mutation({
            query:(student)=>({
                url:`/subjects/subject`,
                method:'POST',
                body:{student}
            })
        }),
        updateSubject:builder.mutation({
            query:({id,...subject})=>({
                url:`/subjects/subject/${id}`,
                method:'PUT',
                body:{...subject}
            }),
            invalidatesTags: ['Subjects'],
        }),
        deleteSubject:builder.mutation({
            query:(subjectId)=>({
                url:`/subjects/subject/${subjectId}`,
                method:'DELETE',
            }),
            invalidatesTags: ['Subjects'],
        }),
        unrollStudentFromSubject:builder.mutation({
            query:(subjectIds,studentIds)=>({
                url:`/subjects/unroll`,
                method:'DELETE',
                body:{subjectIds,studentIds}
            })
        }),
    // other endpoints...
    }),
});

export const { 
    useGetSubjectQuery,
    useGetSubjectsQuery,
    useGetSubjectStudentQuery,
    useCreateSubjectMutation,
    useEnrollStudentsInSubjectsMutation,
    useDeleteSubjectMutation,
    useUnrollStudentFromSubjectMutation,
    useUpdateSubjectMutation
 } = apiSubjectSlice;

