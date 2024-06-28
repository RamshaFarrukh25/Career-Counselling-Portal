import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../../../assets/styles/dashboards/admin_css/Header.module.css";

export default function Header() {

  return (
    <>
      <nav className={`navbar navbar-expand-lg  navbar-dark ${HeaderCSS.Background}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <ul className="navbar-nav d-flex flex-row me-1 position-relative"> 
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
