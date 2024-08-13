import axios from "axios";
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addUserDataToServer } from "../FoodService.js";

export const Register = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/Login");
  };

  const [UserData, setUserData] = useState({});

  //handle the form submission
  const handleForm = (e) => {
    console.log(UserData);
    addUserDataToServer1(UserData);
    e.preventDefault();
  };

  //register user method...
  const addUserDataToServer1 = (data) => {
    axios.post(`http://localhost:8081/addUser`, data).then(
      (response) => {
        //console.log(response);
        alert("user added");
        //console.log("success add userCredentials");
        navigate(`/Login`);
        //toast.success("Food added");
      },
      (error) => {
        console.log(error);
        alert(error);
        // console.log("not insertted userCredencials.....");
        //toast.error("Error | Something went wrong!....");
      }
    );
  };
  return (
    <>
      <div className="myDiv">
        <div>
          <header>
            <Container>
              <Row>
                <Col></Col>
              </Row>
            </Container>
          </header>
          <Container>
            <Form className="my-form" onSubmit={handleForm} action="post">
              <div style={{ justifyContent: "center", margin: "20px" }}>
                <h3>Register User Credentials </h3>
                <p>Create an Account</p>
              </div>
              <Row>
                <Col>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Enter Username"
                      name="user"
                      id="user"
                      className="my-input"
                      onChange={(e) => {
                        setUserData({ ...UserData, username: e.target.value });
                      }}
                      // required
                      pattern="^[a-zA-Z\s]+$"
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          " required | Username must be in String!"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      id="email"
                      className="my-input"
                      onChange={(e) => {
                        setUserData({ ...UserData, email: e.target.value });
                      }}
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          " required | Email must be in Proper Formate!"
                        );
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      id="password"
                      className="my-input"
                      onChange={(e) => {
                        setUserData({ ...UserData, password: e.target.value });
                      }}
                      required
                      onInput={(e) => {
                        const password = e.target.value;
                        const pattern =
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]).{8,}$/;
                        if (!pattern.test(password)) {
                          e.target.setCustomValidity(
                            "Required | Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, a digit, and a special character!"
                          );
                        } else {
                          e.target.setCustomValidity("");
                        }
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Input
                      type="select"
                      name="role"
                      id="role"
                      className="my-input"
                      onChange={(e) => {
                        setUserData({ ...UserData, role: e.target.value });
                      }}
                      required
                      pattern="^[a-zA-Z\s]+$"
                      onInvalid={(e) => {
                        e.target.setCustomValidity(" required | Role must be!");
                      }}
                      onInput={(e) => {
                        e.target.setCustomValidity("");
                      }}
                    >
                      <option value="User">Select Role</option> // Add a default
                      option
                      <option value="Admin">Admin</option> // Add the three role
                      options
                      <option value="User">User</option>
                      <option value="Guest">Guest</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    color="success"
                    outline
                    className="my-button"
                  >
                    Add User
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="warning ml-2"
                    type="reset"
                    outline
                    className="my-button"
                  >
                    Clear User
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    type="submit"
                    color="success"
                    outline
                    className="my-button"
                    onClick={() => {
                      goToLoginPage();
                    }}
                  >
                    Go to Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};
