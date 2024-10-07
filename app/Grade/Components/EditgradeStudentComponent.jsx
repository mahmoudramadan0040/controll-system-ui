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
import {Button} from "@mui/material"
config.autoAddCss = false;
function EditGradeStudent() {

    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [filters, setFilters] = useState({
        field: '',
        type: '=',
        value: '',
    });
    // get the information from store
    const students = useSelector((state)=> state.shared.selectedStudents);
    console.log(students)
    const subject = useSelector((state)=> state.shared.selectedSubject);
    console.log(subject);

    // save data in local storage
    if(students.length && subject.length ){
        localStorage.setItem('students',JSON.stringify(students));
        localStorage.setItem('students',JSON.stringify(students));
    } 
    const [addGradeStudent,{isLoading:isLoadingAddGradeStudent,status,isFetching,isError:isErrorAddGradeStudent}] = useAddGradeStudentMutation();
    const [removeGradeStuent,{isLoading:isLoadingRemoveGradeStudent,isError:isErrorRemoveGradeStudent}]=useDeleteStudentGradeMutation();

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
    
    const columns= [        
        {
            title:"Student Information",
            columns:[
                {
                    columns:[
                        { title: 'Student ID', field:"student_id",editor: 'input',editable: true ,headerHozAlign:"center" }, // Make Name column non-editable
                        { title: 'Student class Id', field: 'student_setId', editor: 'input',editable: true ,headerHozAlign:"center" }, // Make Name column non-editable
                        { title: 'Full Name', field: 'fullname', editable: true, editor: 'input',headerHozAlign:"center"  }, // Make Name column non-editab
                    ]
                }
            ],
            headerHozAlign:"center"
        },
        {
            title:"Subject Information",
            columns:[
                { title: 'Semester Score',field: 'maxSemesterScore', columns:[{ title: '105', field: 'semesterScore', editable: true, editor: 'input',headerHozAlign:"center"  },], editable: true, editor: 'input',headerHozAlign:"center"  }, // Make Name column non-editab
                { title: 'Final Score', field: 'name',columns:[{ title: '45', field: 'finalExamScore', editable: true, editor: 'input',headerHozAlign:"center"  },], editable: true, editor: 'input',headerHozAlign:"center"  }, // Make Name column non-editab
                { title: 'Total Score', field: 'maxScore',columns:[{ title: '150', field: 'totalScore', editable: true, editor: 'input',headerHozAlign:"center" },], editable: true, editor: 'input',headerHozAlign:"center" }, // Make Name column non-editab
                { title: 'Grade', field: 'grade',columns:[{ title: '[pass - fail]', field: 'grade', editor: 'input',headerHozAlign:"center" },], editor: 'input',headerHozAlign:"center" }, // Make Grade column editable
            ],
            headerHozAlign:"center"
        },
        // Column with Edit and Delete buttons
        { 
            title: 'Actions', 
            field: 'actions', 
            hozAlign: 'center', 
            width: 150,
            formatter: (cell, formatterParams) => {
                // Custom HTML for edit and delete buttons
                // return `
                //     <button class="edit-btn" style="">Edit</button>
                //     <button class="delete-btn">Delete</button>
                // `;
                // return `
                //     <button class="rounded bg-slate-800">Edit</button>
                //     <button class="rounded bg-slate-800" onClick="test();">Delete</button>
                // `
                return <testComp></testComp>
                    
               
                    
                
            },
            cellClick: (e, cell) => {
                const className = e.target.className;
                const row = cell.getRow();

                if (className.includes('edit-btn')) {
                    handleEdit(row); // Call edit function
                } else if (className.includes('delete-btn')) {
                    handleDelete(row); // Call delete function
                }
            }
        },

        // Column with a redundant icon in each row
        { 
            title: 'Info', 
            field: 'info', 
            hozAlign: 'center', 
            width: 100,
            formatter: () => {
                return `<i class="fa fa-info-circle"></i>`;
            }
        }
        
    ];
    
    const customFilter = (data) => {
        return data.car && data.rating < 3;
    };

    const updateFilter = () => {
        const { field, type, value } = filters;
        const filter = field === "function" ? customFilter : field;

        if (field) {
            tableRef.current.setFilter(filter, type, value);
        }
    };

    const handleFieldChange = (e) => {
        const field = e.target.value;
        setFilters({ ...filters, field });
        updateFilter();
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;
        setFilters({ ...filters, type });
        updateFilter();
    };

    const handleValueChange = (e) => {
        const value = e.target.value;
        setFilters({ ...filters, value });
        updateFilter();
    };

    const clearFilters = () => {
        setFilters({ field: '', type: '=', value: '' });
        if (tableRef.current) {
            tableRef.current.clearFilter();
        }
    };
    const handelCellEdit =(e,cell)=>{
        // const rowData = cell.getRow().getData();
        // console.log(rowData)
        console.log(e._cell.row.data);
    }
    const testComp =()=>{
        return <Button variant="contained"  color="error">Edit</Button>
    }
    return ( 
        <>
            <GradeTableFilter></GradeTableFilter>
            <div className='mt-6 flex flex-wrap justify-center'>
            
                <h2 className='w-11/12  mb-6'>Monitor { subject ? subject.name : ''} Grades </h2>
                <ReactTabulator className="w-11/12 "
                data={data}
                columns={columns}
                events={{
                    cellEdited: handelCellEdit
                }}
                layout={"fitColumns"}
                />
                {/* <FontAwesomeIcon icon="far fa-check-circle" style={{color: "#21b085",}} /> */}
            </div>
        </>
    );
}

export default EditGradeStudent;