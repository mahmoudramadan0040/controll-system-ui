import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
function CustomNategaReport() {

    const generateReport = async ()=>{
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("sheet1");
        // Add headers and data
    // worksheet.columns = [
    //     { header: "ID", key: "id", width: 10 },
    //     { header: "Name", key: "name", width: 30 },
    //     { header: "Email", key: "email", width: 30 },
    //   ];
  
    //   worksheet.addRow({ id: 1, name: "Alice", email: "alice@example.com" });
    //   worksheet.addRow({ id: 2, name: "Bob", email: "bob@example.com" });
    //   worksheet.addRow({ id: 3, name: "Charlie", email: "charlie@example.com" });
  
        // Generate the Excel file buffer   
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
            "GeneratedFile.xlsx"
        );
    } 


    return ( 
        <></>
     );
}

export default CustomNategaReport;