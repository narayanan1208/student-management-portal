import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { getStudents, updateStudent } from "../redux-toolkit/student/StudentActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { setEditModalShowFalse, Student } from "../redux-toolkit/student/StudentSlice";

const UpdateStudentModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { updatedStudent: student, editModalShow } = useSelector(
    (state: RootState) => state.students
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!student || student.studentId === undefined) {
      alert("Invalid student data.");
      return;
    }
    const studentId = student.studentId;
    const formData = new FormData(e.currentTarget); // Extract form data
    const updatedStudent: Student = {
      firstName: formData.get("FirstName") as string,
      lastName: formData.get("LastName") as string,
      registrationNo: formData.get("RegistrationNo") as string,
      email: formData.get("Email") as string,
      course: formData.get("Course") as string,
    };

    try {
      await dispatch(
        updateStudent({ studentId, student: updatedStudent })
      ).unwrap();
      dispatch(setEditModalShowFalse());
      dispatch(getStudents());
      alert("Student updated successfully!");
    } catch (error) {
      alert("Failed to update student.");
    }
  };

  return (
    <div className="container">
      <Modal
        show={editModalShow}
        onHide={() => dispatch(setEditModalShowFalse())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Student Information
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
                    defaultValue={student?.firstName}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group controlId="LastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="LastName"
                    required
                    defaultValue={student?.lastName}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="RegistrationNo">
                  <Form.Label>Registration No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="RegistrationNo"
                    required
                    defaultValue={student?.registrationNo}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    required
                    defaultValue={student?.email}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Course">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    name="Course"
                    required
                    defaultValue={student?.course}
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
            onClick={() => dispatch(setEditModalShowFalse())}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateStudentModal;
