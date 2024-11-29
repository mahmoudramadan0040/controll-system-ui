"use client"


import 'tabulator-tables/dist/css/tabulator.min.css'; // Import Tabulator styles
import { ReactTabulator } from 'react-tabulator'
import { useSelector } from 'react-redux';
import {GRADE} from "./Grade_Tags";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import React,{useState,useRef,useEffect,useMemo} from "react";
import {
    useAddGradeStudentMutation,
    useGetStudentGradeInSubjectQuery,
    useDeleteStudentGradeMutation,
    useGetGradesInSubjectQuery
} from "../../Redux/slices/Grade_Slice_API";
import GradeTableFilter from "./GradeTableFilterComponent";
// import ActionTableGrade from './ActionTableGradeComponent';
import { stringify, parse } from 'flatted';
import styles from './grade.module.css';


config.autoAddCss = false;
function EditGradeStudent() {

    
    // get the information from store
    const students = useSelector((state)=> state.shared.selectedStudents);
    const subject = useSelector((state)=> state.shared.selectedSubject);

    const {
        data:prevGrades=[],
        isLoading:isLoadingGradesInSubject,
        isFetching:isFetchingGradesInSubject,
        isError:isErrorGradesInSubject,
    } = useGetGradesInSubjectQuery({subjectId:subject.id});
    const [
      addGradeStudent,
      {
        isLoading: isLoadingAddGradeStudent,
        isFetching:isFetchingAddGradestudent,
        isError: isErrorAddGradeStudent,
      },
    ] = useAddGradeStudentMutation();
    const [
      removeGradeStudent,
      {
        isSuccess:isSuccessRemoveGradeStudent,
        isLoading: isLoadingRemoveGradeStudent,
        isError: isErrorRemoveGradeStudent,
      },
    ] = useDeleteStudentGradeMutation();
    
    console.log(prevGrades);
   
    
    const data = useMemo(
        () => {
            const studentInformation = students.map(student => {
                return {
                    student_id:student.student_id,
                    student_setId:student.student_setId,
                    fullname:student.fullname,
                    id:student.id
                }
            }) 
            
            console.log(prevGrades);
            
            const gradeMap = prevGrades.length ? prevGrades.reduce((acc, grade) => {
                acc[grade.studentId] = grade; // Map studentId to their grade
                return acc;
              }, {}):[];
            
            
            return studentInformation.map((student) => {
                const prevGrade = gradeMap[student.id] || {}; 
                
                // Get the grade for the student
                return prevGrade ? parse(stringify({
                    ...student,
                    semesterScore: prevGrade.semesterScore ,
                    finalExamScore: prevGrade.finalExamScore ,
                    totalScore: prevGrade.totalScore ,
                    grade: prevGrade.grade ,
                    subjectId: subject.id,
                    }))
                :
                parse(stringify({
                    ...student,
                    semesterScore: prevGrade.semesterScore || "",
                    finalExamScore: prevGrade.finalExamScore || "",
                    totalScore: prevGrade.totalScore || "",
                    grade: prevGrade.grade || "",
                    subjectId: subject.id,
                }))
            });
        

        },[students,subject.id,prevGrades.length]);
            
    const HandelInputCell=async (cell)=>{
        const row = cell.getRow();
        const data = row.getData();
        
        let totalScore=0;
        if(parseFloat(data.semesterScore) + parseFloat(data.finalExamScore)){

            try{
                totalScore = parseFloat(data.semesterScore || 0) + parseFloat(data.finalExamScore || 0);
                // row.update({ totalScore });
                let grade = {
                    semesterScore:parseFloat(data.semesterScore),
                    finalExamScore:parseFloat(data.finalExamScore),
                    totalScore:parseFloat(totalScore),
                    studentId:data.id,
                    subjectId:data.subjectId
                }

                let res = await addGradeStudent({grade,subjectId:data.subjectId}).unwrap();
                
                
                row.update({ 
                    semesterScore:res[0].semesterScore,
                    finalExamScore:res[0].finalExamScore,
                    totalScore:res[0].totalScore,
                    grade:res[0].grade,
                    info:GRADE.AcceptAction
                })
            }catch(e){
                row.update({info:GRADE.FailedAction});
            }
            

        }else if (
            data.semesterScore == GRADE.Absent ||
            data.semesterScore == GRADE.Execuse ||
            data.finalExamScore == GRADE.Absent ||
            data.finalExamScore == GRADE.Execuse
        ) {
            totalScore = data.finalExamScore;
            row.update({ 
                totalScore
            });

        } else if (parseFloat(data.semesterScore) + parseFloat(data.finalExamScore) ==0) {
            
            try{
                totalScore = 0;
                let grade = {
                    semesterScore:parseFloat(data.semesterScore),
                    finalExamScore:parseFloat(data.finalExamScore),
                    totalScore:parseFloat(totalScore),
                    studentId:data.id,
                    subjectId:data.subjectId
                }
                let res= await addGradeStudent({grade,subjectId:data.subjectId}).unwrap();
                row.update({ 
                    semesterScore:res[0].semesterScore,
                    finalExamScore:res[0].finalExamScore,
                    totalScore:res[0].totalScore,
                    grade:res[0].grade,
                    info:GRADE.AcceptAction
                })

            }catch(e){
                row.update({info:GRADE.FailedAction});
            }
            

        } else {
            totalScore = "";
            row.update({ totalScore });
        }
        




    }
    const formatCellStatus =(cell) =>{
        const value = cell.getValue();
        // Apply conditional styles
        if (value===GRADE.Absent) {
        cell.getElement().style.backgroundColor = "#f8d7da";  // Light red background
        cell.getElement().style.color = "#721c24";  // Dark red text
        cell.getElement().style.fontWeight = "bold";  // Bold text
        
        } else if (value ===GRADE.Execuse) {
        cell.getElement().style.backgroundColor = "#fff3cd";  // Light yellow background
        cell.getElement().style.color = "#856404";  // Dark yellow text
        cell.getElement().style.fontWeight = "bold";  // Bold text
        } else {
        // Reset style for regular numeric values
        cell.getElement().style.backgroundColor = "";  // Default background
        cell.getElement().style.color = "";  // Default text color
        cell.getElement().style.fontWeight = "bold";  // Default font weight
        // cell.getElement().style.fontSize = "1em"; 
        }

        return value; // Return the actual value for display
    }
    const handelResendData =async (cell)=>{
        // try{
        //     const row = cell.getRow();
        //     const data = row.getData();
        //     let rowIndex = row.getPosition();
        //     console.log(rowIndex)
        //     let grade = {
        //                 semesterScore:parseFloat(data.semesterScore),
        //                 finalExamScore:parseFloat(data.finalExamScore),
        //                 totalScore:parseFloat(50),
        //                 studentId:data.id,
        //                 subjectId:data.subjectId
        //             }

        //     let res= await addGradeStudent({grade,subjectId:data.subjectId}).unwrap();
           
        //     console.log(tableRef)
        //     console.log(tableRef.current)
            
        //     if (tableRef.current) {
        //         tableRef.current.table.updateRow(rowIndex,{
        //             semesterScore:res[0].semesterScore,
        //             finalExamScore:res[0].finalExamScore,
        //             totalScore:res[0].totalScore,
        //             grade:res[0].grade,
        //             info: GRADE.AcceptAction
        //         })
        //     }
    
        // }catch(e){
        //     tableRef.current.table.updateRow(rowIndex,{
        //         info: GRADE.FailedAction
        //     })
        // }
        

        try{
            const row = cell.getRow();
            const data = row.getData();

            let grade = {
                semesterScore:parseFloat(data.semesterScore),
                finalExamScore:parseFloat(data.finalExamScore),
                totalScore:parseFloat(data.totalScore),
                studentId:data.id,
                subjectId:data.subjectId
            }
            let res= await addGradeStudent({grade,subjectId:data.subjectId}).unwrap();
           
            row.update({ 
                semesterScore:res[0].semesterScore,
                finalExamScore:res[0].finalExamScore,
                totalScore:res[0].totalScore,
                grade:res[0].grade,
                info: GRADE.AcceptAction
            })
        }catch(e){
            const row = cell.getRow();
            row.update({info:GRADE.FailedAction});
        }

    }
    const handelClearData = async (cell) =>{
        const row = cell.getRow();
        const data = row.getData();
        let {id:studentId,subjectId} = data;

        try{
            await removeGradeStudent({studentId,subjectId}).unwrap();
            row.update({
                semesterScore:'',
                finalExamScore:'',
                totalScore:'',
                grade:'',
                info: GRADE.AcceptAction
            })
        }catch(e){
            row.update({info:GRADE.FailedAction});
        }
        
    }
    const SharedProperty ={
        hozAlign: "center",
        vertAlign :"middel",
        headerHozAlign: "center",
        editable: true,
        headerSort: false
    }
    const columns= [        
        {
            title:"Student Information",
            columns:[
                {
                    columns: [
                        {
                            ...SharedProperty,
                            title: 'Student ID',
                            field: "student_id",
                            editor: 'input',
                            editable: false,

                        }, // Make Name column non-editable
                        {
                            ...SharedProperty,
                            title: 'Student class Id',
                            field: 'student_setId',
                            editor: 'input',
                            editable: false,
                            
                        }, // Make Name column non-editable
                        {
                            ...SharedProperty,
                            title: 'Full Name',
                            field: 'fullname',
                            editable: false,
                            editor: 'input',
                        }, // Make Name column non-editab
                    ]
                }
            ],
            headerHozAlign:"center"
        },
        {
            title:"Subject Information",
            columns:[
                { 
                    title: 'Semester Score',
                    field: 'maxSemesterScore', 
                    columns:[{ 
                        title: '105',
                        field: 'semesterScore',
                        editor: 'input',
                        cellEdited:HandelInputCell,
                        ...SharedProperty,
                        editorParams: {
                            values: [GRADE.Absent, GRADE.Execuse], // Keywords suggestions
                            allowEmpty: true,             // Allow empty value
                            showListOnEmpty: true,        // Show suggestions when the field is empty
                            freetext: true                // Allow user to enter values not in the list
                        },
                        // Add cell formatter for styling
                        formatter: formatCellStatus,
                    },],
                    editable: true, 
                    editor: 'input',
                    headerHozAlign:"center" 
                }, // Make Name column non-editab
                
                { 
                    title: 'Final Score',
                    field: 'name',
                    
                    columns:[{ 
                        title: '45',
                        field: 'finalExamScore',
                        editor: 'input',
                        ...SharedProperty,
                        cellEdited:HandelInputCell,
                        
                        editorParams: {
                            values: [GRADE.Absent, GRADE.Execuse], // Keywords suggestions
                            allowEmpty: true,             // Allow empty value
                            showListOnEmpty: true,        // Show suggestions when the field is empty
                            freetext: true                // Allow user to enter values not in the list
                        },
                        // Add cell formatter for styling
                        formatter: formatCellStatus,
                    },], 
                    
                    editable: true,
                    editor: 'input',
                    headerHozAlign:"center",
               
                }, // Make Name column non-editab
                
                {
                    title: 'Total Score', field: 'maxScore',
                    columns: [{
                        title: '150',
                        field: 'totalScore',
                        // editor: 'input',
                        ...SharedProperty,
                        formatter: formatCellStatus,
                    },],
                    ...SharedProperty,
                    // editor: 'input',
                    
                }, // Make Name column non-editab
                
                {
                    title: 'Grade',
                    field: 'grade',
                    columns: [{ 
                        title: '[pass - fail]',
                        field: 'grade',
                        editor: 'input',
                        ...SharedProperty,
                    },],
                    editor: 'input', 
                    headerHozAlign: "center"
                }, // Make Grade column editable
            ],
            headerHozAlign:"center"
        },
        // Column with Edit and Delete buttons
        { 
            headerHozAlign:"center",
            title: 'Actions', 
            field: 'actions', 
            hozAlign: 'center', 
            vertAlign:'middel',
            width: 150,
            formatter: (cell)=>{




                const buttonContainer = document.createElement('div');

                const SendBtn = document.createElement('button');
                SendBtn.innerText = 'Resend';
                
                SendBtn.className='rounded-md bg-green-600 py-0 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
                SendBtn.onclick = () => handelResendData(cell);

                const ClearBtn = document.createElement('button');
                ClearBtn.innerText = 'Clear';
                
                ClearBtn.className='rounded-md bg-red-600 py-0 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2';
                ClearBtn.onclick = () => handelClearData(cell);
                buttonContainer.appendChild(SendBtn);
                buttonContainer.appendChild(ClearBtn);
                

                return buttonContainer;
            },
        },

        // Column with a redundant icon in each row
        { 
            headerHozAlign:"center",
            title: 'Status', 
            field: 'info', 
            hozAlign: 'center', 
            vertAlign:'middel',
            width: 100,
            formatter: (cell) => {
                const value = cell.getValue(); // Get the cell value

                if(value == GRADE.AcceptAction){
                    return `
                    <div class="rounded-md flex items-center bg-green-200 py-0.25 px-2.5 border border-transparent text-sm text-green-800 transition-all shadow-sm">
                        <div class="mx-auto block h-2 w-2 rounded-full bg-green-800 mr-2"></div>
                        Done 
                    </div>`;
                }else if(value == GRADE.FailedAction){

                    return `<div class="rounded-md flex items-center bg-red-200 py-0.25 px-2.5 border border-transparent text-sm text-red-800 transition-all shadow-sm">
                        <div class="mx-auto block h-2 w-2 rounded-full bg-red-800 mr-2"></div>
                        Failed 
                    </div>`
                }else{
                    return `
                    <div class="rounded-md flex items-center bg-gray-200 py-0.25 px-2.5 border border-transparent text-sm text-gray-800 transition-all shadow-sm">
                        UnDefine
                    </div>
                    `
                }
                
            }
        }
        
    ];
    
    const options = {
        responsiveLayout:"collapse",
        maxHeight:"80vh"
        // layout:"fitDataFill",
        // eight: 3,
        // movableRows: true,
        // progressiveLoad: 'scroll',
        // progressiveLoadDelay: 200,
        // progressiveLoadScrollMargin: 30,
        // paginationSize:6
    }



    return ( 
        <>
            {/* <GradeTableFilter></GradeTableFilter> */}
            <div className='mt-6 flex flex-wrap justify-center'>
            
                <h2 className='w-11/12  mb-6'>Monitor { subject ? subject.name : ''} Grades </h2>
                <ReactTabulator className="w-11/12 "
                data={data}
                options={options}
                // maxHeight={"60vh"}
                columns={columns}
                movableRows={true}
                layout={"fitColumns"}
                />

            </div>
        </>
    );
}


export default EditGradeStudent;