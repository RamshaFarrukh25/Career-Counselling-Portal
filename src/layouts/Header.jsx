import HeaderCSS from "../assets/styles/Header.module.css"
import { Link} from "react-router-dom"
import { handleModelChange,resetCount,ErrorMsg } from "../features/offerCounselling/offerCounsellingSlice"
import { setNotificationData } from "../features/header/headerSlice"
import { useDispatch,useSelector } from "react-redux"
import React from "react"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Pusher from "pusher-js"
export default function Header(){
   const dispatch = useDispatch()
   const {notificationData} = useSelector((store) => store.header)
   const [notification, setNotification] = React.useState(null)
    const notificationOpen = Boolean(notification)
    const { user_id, is_exist } = useSelector((store) => store.authentication)
    
    
    const handleNotification = (event) => {
        setNotification(event.currentTarget)
    }

    const handleNotificationClose = () => {
        setNotification(null)
    }
    const pusher = new Pusher('66a0704e45889e2fdd5a', {
        cluster: 'ap1'
      });
    const channel = pusher.subscribe('Career_Counselling_portal-development');
    console.log("Hello from header")
    channel.bind('demo', function(data) {

        console.log("bind", data.message)
        const filteredMessages = data.message.filter((e) => user_id == e.receiver_id);
        console.log("Filter", filteredMessages)
    
        // Sort notifications based on the timestamp in descending order
        const sortedNotifications = filteredMessages.sort((a, b) => new Date(b.last_message_created_at) - new Date(a.last_message_created_at));
    
        if (sortedNotifications.length > 0) {
            // Update notification count
            dispatch(setNotificationData({ data: sortedNotifications }));
        } else {
            dispatch(setNotificationData({ data: [] }));
        }
    
       
    });
    
  return (
    <header className={HeaderCSS.header}>
        <nav className={` ${HeaderCSS.navigation} navbar navbar-expand-lg`}>
            <div className="container-fluid d-flex flex-column">
                <div className="container-fluid d-flex align-items-center justify-content-center">
                    <Link className={`${HeaderCSS.navbarBrand} navbar-brand`} to=".">
                        <h1 className={`${HeaderCSS.logoHeading} mt-2`}> ▂▃▅▇█▓▒░ BotGuidedPathways ░▒▓█▇▅▃▂</h1>
                    </Link>
                    <button className={` ${HeaderCSS.navbbarToggler} navbar-toggler ms-auto`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>   

                <div className={` ${HeaderCSS.navbarCollapse} navbar-collapse collapse`} id="navbarNav">
                    <ul className={` ${HeaderCSS.navbarNav} navbar-nav ms-auto d-flex align-items-center`}>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link to="." className={`${HeaderCSS.navLink} nav-link`}  >Home</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link to="askCounsellor" className={`${HeaderCSS.navLink} nav-link`}  >Ask Counsellor</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link to="OfferCounselling" className={`${HeaderCSS.navLink} nav-link`}
                            onClick={(event)=>{
                                dispatch(handleModelChange())
                                dispatch(resetCount())
                                dispatch(ErrorMsg({
                                    msg:''
                                }))
                            }}
                            >Offer Counselling</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link className={`${HeaderCSS.navLink} nav-link`}  to="about">About Us</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <a href="#blogCards" className={`${HeaderCSS.navLink} nav-link`}>Blogs</a>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <a href="#reviews" className={`${HeaderCSS.navLink} nav-link`}>Reviews</a>
                        </li>
                          {/* Bell icon at the end */}
                    
                          <Link 
                            className={HeaderCSS.links} 
                            id="notification-button"
                            aria-controls={notificationOpen ? 'notification-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={notificationOpen ? 'true' : undefined}
                            onClick={handleNotification}
                        >
                            
                            {notificationData && notificationData.length > 0 && notificationData[0].total_unread_message_count > 0 && (
                                <span className={HeaderCSS.notificationCount}>
                                    {notificationData[0].total_unread_message_count}
                                </span>
                            )}
                            <span>
                                <i className={`${HeaderCSS.bellIcon} fa-solid fa-bell`}></i>
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
                        {notificationData.map((notificationItem, index) => ([
                            <MenuItem 
                                key={`menu-item-${index}`}
                                style={{ 
                                    whiteSpace: 'normal', 
                                    fontFamily: "var(--fontHeading)", 
                                }}
                            >
                                You may have {notificationItem.channel_unread_message_count} unread message from {notificationItem.sender_name} and message is {notificationItem.last_message}
                            </MenuItem>,
                            index < notificationData.length - 1 && <hr key={`divider-${index}`} />,
                        ]))}
                    </Menu>


                    </ul>
                </div>
            </div>
        </nav>      
    </header>
  )
}

