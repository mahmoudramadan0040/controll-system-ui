"use client"


import 'tabulator-tables/dist/css/tabulator.min.css'; // Import Tabulator styles
import { ReactTabulator } from 'react-tabulator'
function EditGradeStudent() {

    const data = [
        { id: 1, name: 'محمود رمضان احمد عبده ', grade: 'A' },
        { id: 2, name: 'احمد رمصان احمد ', grade: 'B' },
        { id: 3, name: 'يوسف صالح فولى', grade: 'B' },
        { id: 4, name: 'Jane', grade: 'B' },
        { id: 5, name: 'Jane', grade: 'B' },
        // Add more data as needed...
    ];
    const columns= [
        { title:"Test header ",colspan:2},
        { title: 'ID', field: 'id', editable: false }, // Make Name column non-editable
        { title: 'Name', field: 'name', editable: true, editor: 'input'  }, // Make Name column non-editab
        { title: 'Grade', field: 'grade', editor: 'input' }, // Make Grade column editable
    ];
    
    return ( 
        <div>
            <ReactTabulator
            data={data}
            columns={columns}
            layout={"fitColumns"}
            />
        </div>
        
     );
}

export default EditGradeStudent;