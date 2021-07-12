import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="main-component">
      <div class="cont">
        <div class="form sign-in">
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
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
