import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { loginUser } from "../redux-toolkit/authentication/AuthenticationActions"; // Import your login action
import { RootState, AppDispatch } from "../../../store";
import { resetError } from "../redux-toolkit/authentication/AuthenticationSlice";

const Login = () => {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: loginError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      dispatch(resetError());
      // Save tokens to localStorage
      localStorage.setItem("accessToken", result.access);
      localStorage.setItem("refreshToken", result.refresh);
    } catch (err) {
      setError(err as string); // Show error if login fails
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0f4f8, #d9e4f5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Row
        className="w-100"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* Login Card */}
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card
            style={{
              padding: "30px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <h3
              className="text-center mb-4"
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              Login
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="Email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group controlId="Password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>
              {loginError && (
                <div className="text-danger text-center mb-3">
                  {/* Handle both string and LoginError */}
                  {typeof loginError === "string"
                    ? loginError
                    : loginError.email
                    ? loginError.email[0]
                    : "An error occurred"}
                </div>
              )}
              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  style={{ padding: "10px 20px", fontSize: "1rem" }}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row
        className="mt-5 w-100"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* Sign Up Link */}
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card
            style={{
              padding: "30px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3
              className="mb-4"
              style={{ fontWeight: "bold", fontSize: "1.5rem" }}
            >
              Don't have an account?
            </h3>
            <Link
              to="/signup"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Sign Up
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
