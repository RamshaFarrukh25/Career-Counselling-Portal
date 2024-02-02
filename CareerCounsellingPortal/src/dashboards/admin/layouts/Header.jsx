import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../../../assets/styles/dashboards/admin_css/Header.module.css";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg  navbar-dark ${HeaderCSS.Background}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <ul className="navbar-nav d-flex flex-row me-1 position-relative">
            {/* <li className="nav-item me-3 me-lg-0">
              <Link className="nav-link text-white" to="/">
                Main Side
              </Link>
            </li> */}
            <li className="nav-item me-3 me-lg-0">
              <div className={`position-relative ${HeaderCSS.bellIconContainer}`}>
                <a
                  className="nav-link text-white"
                  href="#"
                  onClick={handleNotificationClick}
                >
                  <i className="fas fa-bell"></i>
                </a>
                {showNotifications && (
                  <div className={`${HeaderCSS.notificationPanel} `}>
                    {/* Your notification content goes here */}
                    <p>You have a new notification!</p>
                    <p>Another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    <p>Yet another notification!</p>
                    {/* Add more notification content here */}
                  </div>
                )}
              </div>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <Link className="nav-link text-white" to="/admin/profile">
                <i className={`fa fa-user mr-4 ${HeaderCSS.iconSpacing}`} aria-hidden="true"></i>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
