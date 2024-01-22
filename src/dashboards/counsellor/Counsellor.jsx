import { Link, Outlet } from "react-router-dom"
import CounsellorCSS from "../../assets/styles/dashboards/counsellor_css/Counsellor.module.css"
import React from "react"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCardImage
} from 'mdb-react-ui-kit'
import ProfilePic from "../../assets/images/AboutUs_Team1.jpeg"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function Counsellor(){
    const [sidebar, showSidebar] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [notification, setNotification] = React.useState(null)
    const notificationOpen = Boolean(notification)
    const open = Boolean(anchorEl)
    
    var fullHeight = function() {
		$('.js-fullheight').css('height', $(window).height())
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height())
		})
	}

    function handleClick(){
        showSidebar(prevSideBar => !prevSideBar)
        fullHeight()
    }

    const handleNotification = (event) => {
        setNotification(event.currentTarget)
    }

    const handleNotificationClose = () => {
        setNotification(null)
    }

    const handleIconClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleIconClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
        <div className={`${CounsellorCSS.wrapper} d-flex align-items-stretch`}>
            <div id={CounsellorCSS.sidebar} className={sidebar ? CounsellorCSS.active : ''}>
                <MDBContainer className={CounsellorCSS.counsellorProfile}>
                    <MDBRow>
                        <MDBCol lg="12">
                            <MDBCardImage
                            src={ProfilePic}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid />
                            <p className={`${CounsellorCSS.counsellorName} mb-4`}>Ramsha Farrukh</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <ul className={`${CounsellorCSS.components} mb-5`}>
                    <li>
                        <Link className={CounsellorCSS.links} to="."><span className="fa fa-home"></span>Dashboard</Link>
                    </li>
                    <li>
                        <Link className={CounsellorCSS.links} to="profile"><span className="fa fa-user"></span>Profile</Link>
                    </li>
                    <li>
                        <Link className={CounsellorCSS.links} to="addBlog"><span className="fa-solid fa-pen-to-square"></span>Add Blog</Link>
                    </li>
                    <li>
                        <Link className={CounsellorCSS.links} to="showBlogs"><span className="fa fa-sticky-note"></span>Show Blogs</Link>
                    </li>
                </ul>
            </div>
        
        <div id={CounsellorCSS.content} className="p-4 p-md-5">
            <div className={`${CounsellorCSS.counsellorNavbar} navbar navbar-expand-lg navbar-light `}>
            <div className="container-fluid">

                <button 
                    id={CounsellorCSS.sidebarCollapse} 
                    className={`${CounsellorCSS.burger} btn btn-primary`}
                    onClick={handleClick}
                >
                    <i className="fa fa-bars"></i>
                    
                </button>

                <div className={CounsellorCSS.icons}>
                    {/* Bell Icon for notification */}
                    <Link 
                        className={CounsellorCSS.links} 
                        id="notification-button"
                        aria-controls={notificationOpen ? 'notification-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={notificationOpen ? 'true' : undefined}
                        onClick={handleNotification}
                    >
                        <span><i className={`${CounsellorCSS.bellIcon} fa-solid fa-bell`}></i></span>
                    </Link>
                    <Menu
                        id="notification-menu"
                        aria-labelledby="notification-button"
                        anchorEl={notification}
                        open={notificationOpen}
                        onClose={handleNotificationClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        PaperProps={{
                            style: {
                                width: "300px",
                                backgroundColor: "var(--lightPink)" 
                            }
                        }}
                    >
                        <MenuItem 
                            style={{ 
                                whiteSpace: 'normal', 
                                fontFamily: "var(--fontHeading)", 
                                
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                        </MenuItem>
                        <hr />
                        <MenuItem 
                            style={{ 
                                whiteSpace: 'normal', 
                                fontFamily: "var(--fontHeading)"
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                        </MenuItem>
                        <hr />
                        <MenuItem
                            style={{ 
                                whiteSpace: 'normal', 
                                fontFamily: "var(--fontHeading)"
                            }} 
                        >
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                        </MenuItem>
                        <hr />
                        <MenuItem
                            style={{ 
                                whiteSpace: 'normal', 
                                fontFamily: "var(--fontHeading)"
                            }} 
                        >
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Repellendus, impedit
                        </MenuItem>
                    </Menu>
                    
                    {/* Profile Icon */}
                    <Link 
                        className={CounsellorCSS.pai}
                        id="profile-button"
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleIconClick}
                    >
                        <span><i className="fa-solid fa-user"></i></span>
                    </Link>
                    <Menu
                        id="profile-menu"
                        aria-labelledby="profile-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleIconClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        PaperProps={{
                            style: {
                                backgroundColor: "var(--lightPink)" 
                            }
                        }}
                    >
                        <Link className={CounsellorCSS.profileIcon} to="profile">
                            <MenuItem 
                                onClick={handleIconClose}
                                style={{  
                                    fontFamily: "var(--fontHeading)", 
                                }}
                            >Profile</MenuItem>
                        </Link>
                        <Link className={CounsellorCSS.profileIcon}> 
                            <MenuItem 
                                onClick={handleIconClose}
                                style={{  
                                    fontFamily: "var(--fontHeading)", 
                                }}
                            >Logout</MenuItem>
                        </Link>
                    </Menu>
                </div>
            </div>
            </div>
            <Outlet />
        </div>
        </div>
    </>
    )
}