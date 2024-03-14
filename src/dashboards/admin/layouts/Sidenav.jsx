import { Outlet, Link, useNavigate } from 'react-router-dom'
import SidenavCSS from '../../../assets/styles/dashboards/admin_css/Sidenav.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {logout} from '../../../features/authentication/authenticationSlice'


export default function SidebarNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };


    return (
    <>
    <div className={`container-fluid  `}>
    <div className="row flex-nowrap">
        <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0`}>
            <div className={`d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 ${SidenavCSS.Background}`}>
            <a href="#" className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none`}>
    <span className="menu-icon" style={{ fontSize: '20px', marginRight: '5px' }}>
        &#8801; {/* Unicode for three horizontal bars */}
    </span>
    <span className="fs-5 d-none d-sm-inline">Menu</span>
</a>

                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <Link to ="/admin/dashboard" className="nav-link align-middle px-0 text-white">
                        <i className="fas fa-dashboard" ></i><span className="ms-1 d-none d-sm-inline">DashBoard</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fa fa-check"></i> <span className="ms-1 d-none d-sm-inline">Approve</span></a>
                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/admin/approveCounsellors" className="nav-link px-0 text-white">  <i className="fa fa-users"></i> <span className="d-none d-sm-inline">Approve Counsellors</span></Link>
                            </li>
                            <li>
                                <Link to="/admin/approveBlogs" className="nav-link px-0 text-white"><i className="fas fa-blog"></i> <span className="d-none d-sm-inline">Approve Blogs</span></Link>
                            </li>
                            <li>
                        <Link to="/admin/approveReviews" className="nav-link px-0 text-white"><i className={`fas fa-comment ${SidenavCSS.iconSpacing}`}></i>
                                 <span className="d-none d-sm-inline">Approve Reviews</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                        <i className="fas fa-chart-bar"></i>
                        <span className="ms-1 d-none d-sm-inline ">Reports</span></a>
                        <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                        <li className="w-100">
                    {/* <Link to="/admin/approveCounsellors" className={`nav-link px-0  text-white ${SidenavCSS.iconSpacing}`}>
                        <i className={`fas fa-clipboard-list ${SidenavCSS.iconSpacing}`}></i>
                        <span className="d-none d-sm-inline">Counsellors Report</span>
                        </Link> */}
                    </li>

                            <li><Link to="/admin/userReport" className="nav-link px-0 text-white">
                        <i className={`fas fa-file-alt ${SidenavCSS.iconSpacing}`}></i>
                        <span className="d-none d-sm-inline">Users Report</span>
                            </Link>

                            </li>
                            
                            <li><Link to="/admin/counsellorsReport" className="nav-link px-0 text-white">
                        <i className={`fas fa-file-alt ${SidenavCSS.iconSpacing}`}></i>
                        <span className="d-none d-sm-inline">Counsellors Report</span>
                            </Link>

                            </li>
                        </ul>
                    </li>
                    <li>
                <button className="btn  text-white"
                        onClick={(event) =>{ 
                            dispatch(logout()) 
                            window.location.reload()
                        }}>
                  Log Out
                </button>
              </li>
                </ul>
                <hr/>
            </div>
        </div>
        <div className="col py-3">
                  <Outlet />
        </div>
    </div>
</div>
    </>
  )
}