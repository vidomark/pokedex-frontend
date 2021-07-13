import React, { useEffect, useRef } from "react";
import auth from "../util/authentication";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postData } from "../util/api";
import { Alert } from "react-bootstrap";

export default function Login(props) {
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
    postData(url, formData).then((result) => {
      // Successfull authentication
      if (result.headers.authorization) {
        const token = result.headers.authorization.slice(7);
        auth.login(() => props.history.push("/"), token);
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
