import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logOutUser } from "./redux-toolkit/authentication/AuthenticationActions";
import logo from "../static/logo.png";

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
    if (refreshToken) {
      dispatch(logOutUser(refreshToken))
        .then(() => {
          // Navigate to the login page after successful logout
          navigate("/login");
        })
        .catch((error) => {
          console.error("Logout failed:", error); // Handle any errors during logout
        });
    } else {
      // If refreshToken is not available
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        <div className="d-flex w-100 justify-content-between align-items-center">
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
          <Nav>
            <NavLink to="/logout">
              <Button
                variant="outline-light"
                className="mx-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavLink>
          </Nav>
        </div>
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
              {/* <NavLink to="/login" className="activeClicked">
                <CDBSidebarMenuItem icon="sign-in-alt">
                  Login
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/signup" className="activeClicked">
                <CDBSidebarMenuItem icon="user-plus">Signup</CDBSidebarMenuItem>
              </NavLink> */}
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
