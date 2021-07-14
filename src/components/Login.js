import React, { useEffect } from "react";
import token from "../util/token";
import { toast } from "react-toastify";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postData } from "../util/api";
import { Alert } from "react-bootstrap";

export default function Login(props) {
  toast.configure();
  const notify = () =>
    toast.success("You have been successfully logged in!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: null,
    password: null,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const sendLogin = () => {
    const url = "http://localhost:8080/login";

    // False to not send token
    postData(url, formData, false).then((result) => {
      // Successfull authentication
      if (result.headers.authorization) {
        const jwt = result.headers.authorization.slice(7);
        token.login(() => props.history.push("/"), jwt);
        notify();
      } else {
        setInvalidLogin(true);
      }
    });
  };

  useEffect(() => {}, [invalidLogin]);

  return (
    <div className="main-component">
      <div class="cont">
        <div class="form sign-in">
          {invalidLogin && (
            <Alert variant="danger">Invalid username or password!</Alert>
          )}

          <h2>Login</h2>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              name="username"
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) => handleChange(event)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => sendLogin()}>
            Sign In
          </Button>
        </div>
        <div class="sub-cont">
          <div class="img">
            <div class="img__text m--up">
              <h2>Not a member yet?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <Link to="/registration">
              <div class="img__btn">
                <span class="m--up">Sign Up</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
