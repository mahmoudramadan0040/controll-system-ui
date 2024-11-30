"use client"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useGetNategaReportQuery } from "@/app/Redux/slices/Report_Slice_API";
import { useGetSubjectsReportQuery } from "@/app/Redux/slices/Report_Slice_API";

function CustomNategaReport() {

    
    const {
        data:ReportData=[],
        isLoading:isLoadingNategaReport,
        isFetching:isFetchingNategaReport,
        isError:isErrorNategaReport,
    } = useGetNategaReportQuery({departmentId:"fd090974-ac59-40d2-6d2d-08dd096ffd1d",studentStatus:"First"});
    console.log(ReportData)

    


    const formateCells = (worksheet,cellAddress, value, fontSize = 50, borderStyle = 'thin') =>{
        const cell = worksheet.getCell(cellAddress);
        value ? cell.value =value : '';
        // cell.value =value;
        // Set font size
        cell.font = { size: fontSize };

        // Center the content horizontally and vertically
        cell.alignment = { vertical: 'middle', horizontal: 'center' };

        // Add a border around the cell
        cell.border = {
            top: { style: borderStyle },
            left: { style: borderStyle },
            bottom: { style: borderStyle },
            right: { style: borderStyle },
        };

    }
    const addHeaderOFreport =async(worksheet,workbook)=>{
        const universityLogoBlob = await fetch('./img/image001.png').then(res => res.blob());
        const universityLogoBuffer = await universityLogoBlob.arrayBuffer();
        const FacultyLogoBlob = await fetch('./img/image005.png').then(res => res.blob());
        const FacultyLogoBuffer = await FacultyLogoBlob.arrayBuffer();
        // Add the logo image to the workbook
        const universityImageId = workbook.addImage({
            buffer: universityLogoBuffer,
            extension: 'png', // Image format
        });
         // Add the first logo image (A1 cell)
         worksheet.addImage(universityImageId, {
            tl: { col: 0, row: 0 }, // Position of the first logo image (A1)
            ext: { width: 150, height: 90 }, // Set the width and height of the image
        });

        // Add the logo image to the workbook
        const facultyImageId = workbook.addImage({
            buffer: FacultyLogoBuffer,
            extension: 'png', // Image format
        });
       
        worksheet.addImage(facultyImageId, {
            tl: { col: 49, row: 0 }, // Position of the first logo image (A1)
            ext: { width: 150, height: 90 }, // Set the width and height of the image
        });
        
        worksheet.getColumn(1).width = 20;
        worksheet.getRow(1).height = 80;

        worksheet.mergeCells('B1:AW1')
        formateCells(worksheet,'A1')
        formateCells(worksheet,'AX1')
    }
    

    const generateReport = async ()=>{
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet("sheet1");

        await addHeaderOFreport(worksheet,workbook)

        
        
        


        formateCells(worksheet,'B1','نتيجة الفرقة الاولي عام 2024/2023',50,'thin');

        


        








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
        <>
            <button onClick={generateReport}>Download Custom Report</button>
        </>
     );
}

export default CustomNategaReport;