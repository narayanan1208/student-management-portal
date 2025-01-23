import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../static/logo.png";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        <Navbar.Brand className="app-logo" href="/">
          <img
            src={logo}
            width="40"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{" "}
          Student Management System
        </Navbar.Brand>
      </Navbar>
      <div className="sidebar">
        <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Navigation
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink to="/" className="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/students" className="activeClicked">
                <CDBSidebarMenuItem icon="list">
                  Students List
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/manage" className="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  Manage Students
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Navigation;
