import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { addStudent, getStudents } from "../redux-toolkit/StudentService";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { setAddModalShowFalse } from "../redux-toolkit/StudentSlice";

const AddStudentModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addModalShow } = useSelector((state: RootState) => state.students);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.currentTarget); // Extract form data
    const student = {
      firstName: formData.get("FirstName") as string,
      lastName: formData.get("LastName") as string,
      registrationNo: formData.get("RegistrationNo") as string,
      email: formData.get("Email") as string,
      course: formData.get("Course") as string,
    };

    try {
      await dispatch(addStudent({ student })).unwrap(); // Await addStudent to complete
      dispatch(setAddModalShowFalse());
      dispatch(getStudents());
      alert("Student added successfully!");
    } catch (error) {
      alert("Failed to add student.");
    }
  };

  return (
    <div className="container">
      <Modal
        show={addModalShow}
        onHide={() => dispatch(setAddModalShowFalse())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Fill In Student Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="FirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstName"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="LastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="LastName"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="RegistrationNo">
                  <Form.Label>Registration No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="RegistrationNo"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Course">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    name="Course"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group>
                  <p></p>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            type="submit"
            onClick={() => dispatch(setAddModalShowFalse())}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
