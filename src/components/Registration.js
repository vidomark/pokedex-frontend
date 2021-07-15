import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postData } from "../util/api";

export default function Registration() {
  const [registrationState, setRegistrationState] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const sendRegistration = () => {
    const url = "http://localhost:8080/registration";

    // False to not send token
    postData(url, formData)
      .then((result) => {
        setRegistrationState("success");
        setMessage("Please confirm your email!");
      })
      .catch((error) => {
        setRegistrationState("danger");
        setMessage("Please check your ceredentials!");
      });
  };

  return (
    <div className="main-component">
      <div class="cont">
        <div class="form sign-in">
          <h2>Registration</h2>

          {registrationState && (
            <Alert variant={registrationState}>{message}</Alert>
          )}

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              type="email"
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              type="username"
              placeholder="Username"
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </Form.Group>

          <Button
            onClick={() => sendRegistration()}
            variant="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </div>

        <div class="sub-cont">
          <div class="img">
            <div class="img__text m--up">
              <h2>Already have an account?</h2>
              <p>Sign in and discover great amount of new opportunities!</p>
            </div>
            <Link to="/login">
              <div class="img__btn">
                <span class="m--up">Sign In</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
