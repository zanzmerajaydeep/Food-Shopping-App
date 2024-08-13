import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setUser }) => {
  //login============================================
  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate("/Register");
  };

  //-------------------------------------------------
  const [userData, setUserData] = useState({
    // email: "",
    // password: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
    // console.log("submited Enter Data = " + userData);
    loginUserToServer(userData);
  };

  //login user method...
  const loginUserToServer = (data) => {
    console.log("enter==" + data);
    axios.post(`http://localhost:8081/validateUser`, data).then(
      (response) => {
        // console.log("USER LOGIN SUCCESS | token get" + response.data);
        //console.log(response);
        if (response.data.username != null) {
          localStorage.setItem("userData", JSON.stringify(response.data));
          localStorage.setItem("LoginIn", true);
          alert("success | " + response);
          navigate(`/Home`);
        } else {
          alert("user Not Found!..");
        }
      },
      (error) => {
        // console.log(error);
        if (error.response != undefined) {
          alert("something wrong : " + error.response);
        }
      }
    );
  };

  return (
    <div className="myDiv">
      <div>
        <div sm="12" md="10" lg="8" xl="6" xxl="4">
          <Form className="my-form" onSubmit={handleForm} action="post">
            <div style={{ justifyContent: "center", margin: "20px" }}>
              <h3>Login User Credentials </h3>
              <p>Create an Account</p>
            </div>
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
                      setUserData({ ...userData, email: e.target.value });
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
                      setUserData({ ...userData, password: e.target.value });
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
                <Button
                  type="submit"
                  color="primary"
                  outline
                  className="my-button"
                >
                  Login
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  type="submit"
                  color="success"
                  outline
                  className="my-button"
                  onClick={() => {
                    goToRegisterPage();
                  }}
                >
                  Go To Register
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
