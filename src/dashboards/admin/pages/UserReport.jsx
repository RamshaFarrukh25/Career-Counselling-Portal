import UserReportCSS from "../../../assets/styles/dashboards/admin_css/UserReport.module.css"
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { deleteUser, setSelectedRow, getUsers, handleDeleteRow } from "../../../features/dashboards/admin/userReport/userReportSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserReport(){

  const dispatch = useDispatch()
  const {rows, selectedRow} = useSelector((store) => store.userReport)

  useEffect(() => {
    return () => {
      dispatch(getUsers())
    }
  }, [dispatch])
    
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: UserReportCSS.columnHeader},
    { field: 'name', headerName: 'Name', width: 150 , headerClassName: UserReportCSS.columnHeader},
    { field: 'email', headerName: 'Email', width: 350 , headerClassName: UserReportCSS.columnHeader},
    {
      field: 'actions',
      headerName: 'Delete',
      width: 70,
      headerClassName: UserReportCSS.columnHeader,
      renderCell: (params) => (
      <Tooltip title = "Delete User">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => dispatch(setSelectedRow(params.row.id))}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >   
          <i class="fa-solid fa-trash" aria-hidden="true"></i>
        </button>
      </Tooltip>
      ),
    },
  ];

  const getRowClassName = () => {
      return `${UserReportCSS.rowData}`;
  };

    return(
        <>
        <div className={UserReportCSS.wrapper}> 
            <div className={`container ${UserReportCSS.inner}`}>
                <div className="row">
                    <h2 className={UserReportCSS.heading}>Users Report</h2>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className={`modal-content ${UserReportCSS.modal}`}>
                          <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            Are you sure you want to delete this user?
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" 
                              onClick={(event) => { 
                                        dispatch(
                                          deleteUser({
                                            'selectedRow' : selectedRow
                                          })
                                        )
                                        dispatch(handleDeleteRow())
                                      }
                                      }>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={UserReportCSS.dataGrid}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowClassName={getRowClassName}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                      />
                    </div>
                  </div>
                </div>
            </div> 
        </>
    )
}