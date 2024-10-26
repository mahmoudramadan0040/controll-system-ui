"use client"


import 'tabulator-tables/dist/css/tabulator.min.css'; // Import Tabulator styles
import { ReactTabulator } from 'react-tabulator'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import {useState,useRef,useEffect,useMemo} from "react";
import {useAddGradeStudentMutation,useGetStudentGradeInSubjectQuery,useDeleteStudentGradeMutation} from "../../Redux/slices/Grade_Slice_API";
import GradeTableFilter from "./GradeTableFilterComponent";
// import ActionTableGrade from './ActionTableGradeComponent';
import styles from './grade.module.css';

import React, { useCallback } from 'react';
import {Button} from "@mui/material"
config.autoAddCss = false;
function EditGradeStudent() {
    // get the information from store
    const students = useSelector((state)=> state.shared.selectedStudents);
    const subject = useSelector((state)=> state.shared.selectedSubject);
    const [addGradeStudent,{isLoading:isLoadingAddGradeStudent,status,isFetching,isError:isErrorAddGradeStudent}] = useAddGradeStudentMutation();
    const [removeGradeStuent,{isLoading:isLoadingRemoveGradeStudent,isError:isErrorRemoveGradeStudent}]=useDeleteStudentGradeMutation();
    const tableRef = useRef(null);
    const studentInformation = students.map(student => {
        return {
            student_id:student.student_id,
            student_setId:student.student_setId,
            fullname:student.fullname
        }
    }) 
    const studentInformationWithSubjectInfo=studentInformation.map(student=>{
        return {...student,semesterScore:'',finalExamScore:'',totalScore:'',grade:'',subjectId:subject.id}
    })
    const data = useMemo(() => studentInformationWithSubjectInfo.map(studentInformationWithSubjectInfo => ({ ...studentInformationWithSubjectInfo })), [studentInformationWithSubjectInfo.length]);


    const HandelInputCell=(cell)=>{
        const row = cell.getRow();
        const data = row.getData();
        
        if(parseFloat(data.semesterScore || 0) + parseFloat(data.finalExamScore || 0)){
            const totalScore = parseFloat(data.semesterScore || 0) + parseFloat(data.finalExamScore || 0);
            row.update({ totalScore });

        }else if( 
            data.semesterScore ==="غـ" || 
            data.semesterScore ==="غ" || 
            data.semesterScore ==="مؤجل" || 
            data.finalExamScore ==="غـ" || 
            data.finalExamScore ==="غ" || 
            data.finalExamScore ==="مؤجل" 
        ){
            const totalScore= data.finalExamScore;
            row.update({ totalScore });

        }
        

    }
    const formatCellStatus =(cell, formatterParams) =>{
        const value = cell.getValue();
        // Apply conditional styles
        if (value === "غـ" || value==="غ") {
        cell.getElement().style.backgroundColor = "#f8d7da";  // Light red background
        cell.getElement().style.color = "#721c24";  // Dark red text
        cell.getElement().style.fontWeight = "bold";  // Bold text
        
        } else if (value === "مؤجل") {
        cell.getElement().style.backgroundColor = "#fff3cd";  // Light yellow background
        cell.getElement().style.color = "#856404";  // Dark yellow text
        cell.getElement().style.fontWeight = "bold";  // Bold text
        } else {
        // Reset style for regular numeric values
        cell.getElement().style.backgroundColor = "";  // Default background
        cell.getElement().style.color = "";  // Default text color
        cell.getElement().style.fontWeight = "bold";  // Default font weight
        cell.getElement().style.fontSize = "1.25em"; 
        }

        return value; // Return the actual value for display
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
                        }, // Make Name column non-editable
                        {
                            ...SharedProperty,
                            title: 'Student class Id',
                            field: 'student_setId',
                            editor: 'input',
                            
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
                            values: ["غـ", "مؤجل"], // Keywords suggestions
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
                        editor: 'autocomplete',
                        ...SharedProperty,
                        cellEdited:HandelInputCell,
                        
                        editorParams: {
                            values: ["غـ", "مؤجل"], // Keywords suggestions
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
                        editor: 'input',
                        ...SharedProperty,
                        formatter: formatCellStatus,
                    },],
                    ...SharedProperty,
                    editor: 'input',
                    
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
            width: 150,
            formatter: (cell)=>{
                const buttonContainer = document.createElement('div');

                const SendBtn = document.createElement('button');
                SendBtn.innerText = 'Send';
                SendBtn.className=styles.sendBtn
                SendBtn.onclick = () => handleButtonClick(cell, 'Button 1');

                const ClearBtn = document.createElement('button');
                ClearBtn.innerText = 'Clear';
                ClearBtn.className=styles.clearBtn;
                ClearBtn.onclick = () => handleButtonClick(cell, 'Button 2');

                const EditBtn = document.createElement('button');
                EditBtn.innerText = 'Edit';
                EditBtn.className=styles.editBtn;
                EditBtn.onclick = () => handleButtonClick(cell, 'Button 3');

                buttonContainer.appendChild(SendBtn);
                buttonContainer.appendChild(ClearBtn);
                buttonContainer.appendChild(EditBtn);

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
            formatter: () => {
                return `
                <div class="flex justify-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fa003e" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#06845e" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                </div> `;
            }
        }
        
    ];
    
    

   


     
    
    



    



    return ( 
        <>
            <GradeTableFilter></GradeTableFilter>
            <div className='mt-6 flex flex-wrap justify-center'>
            
                <h2 className='w-11/12  mb-6'>Monitor { subject ? subject.name : ''} Grades </h2>
                <ReactTabulator className="w-11/12 "
                data={data}
                columns={columns}
                // events={{
                //     cellEdited: handelCellEdit
                // }} 
                movableRows={true}

                layout={"fitColumns"}
                />

            </div>
        </>
    );
}


export default EditGradeStudent;