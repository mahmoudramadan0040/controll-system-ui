
"use client"
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  
} from 'material-react-table';
import TableIcons from "./TableIconsComponent";
import {Box, Button, DialogActions,DialogContent,DialogTitle,Dialog,IconButton,Tooltip} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import {setValidationErrors} from "../../Redux/slices/SharedSlice";
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
// ----------------all props to use this component -------------------------------//
// validation schema  [props =>  information.validationSchema ]                    |
// table data [ props => infromation.data ]                                        |
// table column [ props => information.columns ]                                   |
// table intial state [ props => infromation.IntialState.isLoading]                |
// table intial state [ props => infromation.IntialState.isCreatingLoading]        |
// table intial state [ props => infromation.IntialState.isError]                  |
// table intial state [ props => infromation.IntialState.isFetching]               |
// table Create Function [ props => information.HandelCreate ]                     |
// table Edit Function [ props => information.HandelEdit ]                         |
// table Delete Function [ props => information.HandelDelete ]                     |
// table Msg [ props => information.Msg.EditMsg ]                                  |
// table Msg [ props => information.Msg.CreateMsg ]                                |
// table Msg [ props => information.Msg.DeleteMsg ]     
// table Msg [ props => information.Msg.Info ]                                |
// ----------------all props to use this component -------------------------------//
function TableModifiedComponent({information}) {
    const [modelState,setModelState]= useState(false);
    const [row, setRow] = useState({});
    const handelDelete =(row) =>{
        setRow(row);
        information.HandelDelete(row.original.id);
        setModelState(false);
    }
    const handelClose =() =>{setModelState(false);}
    const handelOpen = (row) =>{setModelState(true);setRow(row);}
    const DeleteModel =()=>{

        return (
            <div>
                <Dialog
                    open={true}
                    onClose={handelClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className='w-full'
                >
                    <DialogTitle id="alert-dialog-title">
                        {information?.Msg?.DeleteMsg}
                    </DialogTitle>
                    <DialogContent className="flex justify-center">
                        
                            
                            {information?.columns ? 
                            <table className=" w-full m-4 rounded border-black border-2 border-solid">
                                <thead>
                                    <tr className="justify-center w-full">
                                        <th className="w-full m-3 p-3 text-3xl" colSpan="3"> {information?.Msg?.Info} </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {information?.columns ? 
                                    information?.columns?.map(col =>(
                                        
                                        <tr key={col.accessorKey}>
                                            <td className="w-1/5 pl-2 text-2xl text-black border-black border-2 border-solid">{col.accessorKey}</td>
                                            <td className="w-4/5 pl-2 text-xl text-black border-black border-2 border-solid" >{row.original[col.accessorKey]} </td>
                                        </tr>
                                        
                                    ))
                                    : ""}
                                
                                </tbody>
                            </table>
                            : null}
                            
                            
                            
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handelClose()}>Disagree</Button>
                        <Button onClick={() => handelDelete(row)} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
// -----------------------------------------------------------------------------------// 
//  { Section-3 Design Models Table CreateModel EditModel EditAction DeleteAction }  //
// ---------------------------------------------------------------------------------//
    const CreateForm = ({ table, row, internalEditComponents,information }) => {
        return (
            <div>
                <DialogTitle variant="h5">{information?.Msg?.CreateMsg}</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </div>
        )
    }
    const EditFrom = ({ table, row, internalEditComponents,information }) => {
        return (
            <>
                <DialogTitle variant="h3">{information?.Msg?.EditMsg}</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        )
    }
    const handleExportRows = (rows) => {
        const doc = new jsPDF();
        const tableData = rows.map((row) => Object.values(row.original));
        const tableHeaders = information?.columns.map((c) => c.header);
    
        autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
        });
    
        doc.save('mrt-pdf-example.pdf');
    };
   
    const ActionTable = ({ row, table }) => {
        // const selectedRows = table.getSelectedRowModel().flatRows;
        return (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon className='text-emerald-200' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handelOpen(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    }
    const table = useMaterialReactTable({
        columns:information?.columns,
        data:information?.data,
        icons:TableIcons(),
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        enableRowSelection: true,
        muiToolbarAlertBannerProps: information.isLoading
        ? {color: 'error',children: 'Error loading data',}: undefined,
        muiTableContainerProps: {sx: { minHeight: '500px',backgroundColor:"#2F2F2F",color:"#fff",},},
        // body 
        muiTableBodyCellProps:{sx: {backgroundColor:"#2F2F2F",color:"#fff",border:"solid 1px #F5F7F8"},},
        //  header 
        muiTopToolbarProps:{sx: {backgroundColor:"#2F2F2F",color:"#fff",},},
        //  header 
        muiTableHeadCellProps:{sx: {backgroundColor:"#45474B",color:"#fff",border:"solid 1px #F5F7F8",fontSize:"1em",},},
        muiTablePaperProps:{sx: {backgroundColor:"#2F2F2F",color:"#1976D2",},},
        muiColumnActionsButtonProps:{sx: {color:"#ffffff",},},
        muiBottomToolbarProps:{sx: {backgroundColor:"#2F2F2F",color:"#fff",},},
        muiTablePaperProps:{sx: {border:"solid #1A2130 8px"},},

        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: information?.HandelCreate,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave:information?.HandelEdit,
        renderCreateRowDialogContent:({ table, row, internalEditComponents }) =>  CreateForm({ table, row, internalEditComponents,information }),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => EditFrom({ table, row, internalEditComponents,information }),
        renderRowActions: ({ row, table }) => (<ActionTable row={row} table={table}></ActionTable>),
        renderTopToolbarCustomActions: ({ table }) => (
        <Box
            sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
            }}
        >
            <Button variant="contained" onClick={() => { table.setCreatingRow(true); }}>{information?.Msg?.CreateMsg}</Button>

            <Button variant="contained" disabled={table.getPrePaginationRowModel().rows.length === 0} onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)} startIcon={<FileDownloadIcon />}>
            Export All Rows
            </Button>
            <Button variant="contained" disabled={table.getRowModel().rows.length === 0} onClick={() => handleExportRows(table.getRowModel().rows)} startIcon={<FileDownloadIcon />}>
            Export Page Rows
            </Button>
            <Button variant="contained" disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)}startIcon={<FileDownloadIcon />}>
            Export Selected Rows
            </Button>
        </Box>
        ),









        state: {
            isLoading: information?.IntialState.isLoading,
            isSaving: information?.IntialState.isCreatingLoading,
            showAlertBanner: information?.IntialState.isError,
            showProgressBars: information?.IntialState.isFetching,
            density:"compact"
          },
        });
    return ( 
        
        <div className="grid grid-cols-12 h-auto m-12">
            <div className="col-start-1 col-span-12 text-center">
                <MaterialReactTable table={table}></MaterialReactTable>
                {modelState ? <DeleteModel row={row}></DeleteModel>:""}
            </div>
        </div>
        
    );
}





export default TableModifiedComponent;