import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as StrapNavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CustomeNavbar = ({ count }) => {
  //code for login using DataBase======================================
  const LoginIn = JSON.parse(localStorage.getItem("LoginIn"));
  const userData= JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const removeUserfromLocalStorage = (e) => {
    localStorage.setItem("status", false);
    localStorage.setItem("userData", JSON.stringify(" "));
    navigate("/Login");
  };
  //===========================================================================



  //login================================================================
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  //========================================================================



  //navbar------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //---------------------------------------------------

  return (
    <div>
      <div className="navbar-wrapper">
        <Navbar
          className="navbar navbar-expand-md navbar-light custom-navbar sticky-top my-navbar"
          style={{ backgroundColor: "lightblue" }}
        >
          <NavbarBrand href="/home">Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <StrapNavLink>
                  <NavLink
                    to="/AllFood"
                    style={{ color: "gray", textDecoration: "none" }}
                  >
                    AllFood
                  </NavLink>
                </StrapNavLink>
              </NavItem>
              <NavItem>
                <StrapNavLink>
                  <NavLink
                    to="/CartFood"
                    style={{ color: "gray", textDecoration: "none" }}
                  >
                    CartFood
                  </NavLink>
                </StrapNavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <StrapNavLink>
                      <NavLink
                        to="/AddFastFood"
                        style={{ color: "gray", textDecoration: "none" }}
                      >
                        AddFastFood
                      </NavLink>
                    </StrapNavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <StrapNavLink>
                      <NavLink
                        to="/Register"
                        style={{ color: "gray", textDecoration: "none" }}
                      >
                        Register
                      </NavLink>
                    </StrapNavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <StrapNavLink>
                      <NavLink
                        to="/Login"
                        style={{ color: "gray", textDecoration: "none" }}
                      >
                        Login
                      </NavLink>
                    </StrapNavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <StrapNavLink>
                      <NavLink
                        to="/ShowAllFastFood"
                        style={{ color: "gray", textDecoration: "none" }}
                      >
                        ShowAllFastFood
                      </NavLink>
                    </StrapNavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <StrapNavLink>
                      <NavLink
                        to="/UpdateFood"
                        style={{ color: "gray", textDecoration: "none" }}
                      >
                        UpdateFood
                      </NavLink>
                    </StrapNavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {isAuthenticated ? (
                <NavItem>
                  <NavLink
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Log out
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink onClick={() => loginWithRedirect()}>Log In</NavLink>
                </NavItem>
              )}
              {isAuthenticated ? (
                <NavItem>
                  <NavLink>
                    <strong>
                      <p>{user.name}</p>
                    </strong>
                  </NavLink>
                </NavItem>
              ) : (
                " "
              )}
                   {/* ======================================================================= */}
              {LoginIn == true ? (
                <>
                  <NavItem>
                    <StrapNavLink>
                      <div
                        onClick={(e) => removeUserfromLocalStorage()}
                        style={{ color: "gray", textDecoration: "none" }}
                      >
                        Log out
                      </div>
                    </StrapNavLink>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <StrapNavLink>
                    <NavLink
                      to="/Login"
                      style={{ color: "gray", textDecoration: "none" }}
                    >
                      Log in
                    </NavLink>
                  </StrapNavLink>
                </NavItem>
              )}
               {LoginIn ? (
                <NavItem>
                  <StrapNavLink>
                  <NavLink
                   to="/Login"
                   style={{ color: "gray", textDecoration: "none" }}
                  >
                    <strong>
                      <p>{userData.email}</p>
                    </strong>
                  </NavLink>
                  </StrapNavLink>
                </NavItem>
              ) : (
                " "
              )}
            </Nav>
            <NavbarText>
              Cart <sup>{count}</sup>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};
