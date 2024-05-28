import { Link, Outlet, useNavigate } from "react-router-dom"
import CounsellorCSS from "../../assets/styles/dashboards/counsellor_css/Counsellor.module.css"
import React from "react"

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCardImage
} from 'mdb-react-ui-kit'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from "react-redux"
import {getCounsellorData,setNotificationData} from "../../features/dashboards/counsellor/counsellorSlice"
import {logout} from "../../features/authentication/authenticationSlice"
import Pusher from "pusher-js"

export default function Counsellor(){
    const [sidebar, showSidebar] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [notification, setNotification] = React.useState(null)
    const notificationOpen = Boolean(notification)
    const open = Boolean(anchorEl)
    const dispatch= useDispatch()
    const { user_id, is_exist } = useSelector((store) => store.authentication)
    const {name, email, profilePic,notificationData} = useSelector((store) => store.counsellor)
    const pusher = new Pusher('66a0704e45889e2fdd5a', {
        cluster: 'ap1'
      });
     
    const channel = pusher.subscribe('Career_Counselling_portal-development');
           
    channel.bind('demo', function(data) {
        // console.log("bind", data.message)
        const filteredMessages = data.message.filter((e) => user_id == e.receiver_id);
        console.log("Filer in Counsellor page", filteredMessages)

        // Sort notifications based on the timestamp in descending order
        const sortedNotifications = filteredMessages.sort((a, b) => new Date(b.last_message_created_at) - new Date(a.last_message_created_at));

        if (sortedNotifications.length > 0) {
            // Update notification count
            dispatch(setNotificationData({ data: sortedNotifications }));
        } else {
            dispatch(setNotificationData({ data: [] }));
        }
    });
        React.useEffect(() => {
            async function getData (){
                await dispatch(getCounsellorData())
            }
            getData()
        }, [])
    
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
                            src={`../../../career_counselling_portal/Counsellors/${email}${profilePic}`}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px" }}
                            fluid />
                            <p className={`${CounsellorCSS.counsellorName} mb-4`}>{name}</p>
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
                    <li>
                        <Link className={CounsellorCSS.links} to="counsellorChat"><span className="fas fa-comment-dots"></span>Chat</Link>
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
                    <Link 
                        className={CounsellorCSS.gear}        
                        to="/"
                    >
                        <span> <i className={`fa fa-home ${CounsellorCSS.homeIcon}`} aria-hidden="true"></i></span>
                    </Link>
                    {/* Bell Icon for notification */}
                            <Link 
                            className={CounsellorCSS.links} 
                            id="notification-button"
                            aria-controls={notificationOpen ? 'notification-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={notificationOpen ? 'true' : undefined}
                            onClick={handleNotification}
                        >
                            
                            {notificationData && notificationData.length > 0 && notificationData[0].total_unread_message_count > 0 && (
                                <span className={CounsellorCSS.notificationCount}>
                                    {notificationData[0].total_unread_message_count}
                                </span>
                            )}
                            <span>
                                <i className={`${CounsellorCSS.bellIcon} fa-solid fa-bell`}></i>
                            </span>
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
                        {console.log("Incounsellor page", notificationData)}
                {Object.values(notificationData).map((notificationItem, index) => (
                <React.Fragment key={index}>
                    <MenuItem
                        className={notificationItem.isRead ? 'read-message' : ''}
                        style={{
                            whiteSpace: 'normal',
                            fontFamily: "var(--fontHeading)",
                        }}
                    >
                        You may have {notificationItem.channel_unread_message_count} unread message
                        from {notificationItem.sender_name} and message is {notificationItem.last_message}
                    </MenuItem>
                    <hr />
                </React.Fragment>
            ))}
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
                                style={{  
                                    fontFamily: "var(--fontHeading)", 
                                }}
                                onClick={(event) =>{ 
                                    dispatch(logout()) 
                                    window.location.reload()
                                }}
                            >Logout</MenuItem>
                            
                        </Link>
                    </Menu>
                
                    <Link 
                        className={CounsellorCSS.gear}        
                        to="/counsellor/settings"
                    >
                        <span><i className="fa-solid fa-gear"></i></span>
                    </Link>
                   
                </div>
            </div>
            </div>
            <Outlet />
        </div>
        </div>
    </>
    )
}