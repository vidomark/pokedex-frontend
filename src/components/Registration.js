import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSetConfirmationToken } from "../contexts/ConfirmationTokenProvider";

export default function Registration() {
  const setConfirmationToken = useSetConfirmationToken();
  const [registrationState, setRegistrationState] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const sendRegistration = () => {
    const url = "http://localhost:8080/registration";
    axios
      .post(url, formData)
      .then((result) => {
        setConfirmationToken(result.data);
        setRegistrationState("success");
        setMessage("Please confirm your email");
      })
      .catch((error) => {
        setRegistrationState("danger");
        setMessage("Invalid registration");
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