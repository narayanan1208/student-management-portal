import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux-toolkit/authentication/AuthenticationActions";
import { AppDispatch } from "../../../store";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.currentTarget); // Extract form data
    const user = {
      email: formData.get("Email") as string,
      schoolName: formData.get("SchoolName") as string,
      password: formData.get("Password") as string,
      town: formData.get("Town") as string,
      state: formData.get("State") as string,
      pincode: formData.get("Pincode") as string,
      country: formData.get("Country") as string,
    };

    try {
      await dispatch(signUpUser(user)).unwrap(); // Await signupUser to complete
      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0f4f8, #d9e4f5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          padding: "30px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Sign Up
        </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              required
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group controlId="SchoolName" className="mb-3">
            <Form.Label>School Name</Form.Label>
            <Form.Control
              type="text"
              name="SchoolName"
              required
              placeholder="Enter your school name"
            />
          </Form.Group>
          <Form.Group controlId="Password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              required
              placeholder="Enter your password"
            />
          </Form.Group>
          <Form.Group controlId="Town" className="mb-3">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              name="Town"
              required
              placeholder="Enter your town"
            />
          </Form.Group>
          <Form.Group controlId="State" className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="State"
              required
              placeholder="Enter your state"
            />
          </Form.Group>
          <Form.Group controlId="Pincode" className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="Pincode"
              required
              placeholder="Enter your pincode"
            />
          </Form.Group>
          <Form.Group controlId="Country" className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="Country"
              required
              placeholder="Enter your country"
            />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              style={{ padding: "10px 20px", fontSize: "1rem" }}
            >
              Submit
            </Button>
          </div>
        </Form>
        <div className="text-center mt-1">
          <Link to="/login" className="btn btn-secondary">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;