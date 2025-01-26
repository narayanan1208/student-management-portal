import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { getStudents, deleteStudent } from "../redux-toolkit/student/StudentActions";
import { RootState, AppDispatch } from "../../../store";
import {
  setAddModalShowTrue,
  setEditModalShowTrue,
  setUpdatedStudent,
  Student,
} from "../redux-toolkit/student/StudentSlice";
import AddStudentModal from "./AddStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";

const Manage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, status, isUpdated } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    dispatch(getStudents());
  }, [isUpdated, dispatch]);

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setAddModalShowTrue());
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>, student: Student) => {
    e.preventDefault();
    dispatch(setUpdatedStudent(student));
    dispatch(setEditModalShowTrue());
  };

  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    studentId: number
  ) => {
    e.preventDefault();
    dispatch(deleteStudent(studentId));

    try {
      await dispatch(deleteStudent(studentId)).unwrap();
      alert("Student deleted successfully!");
    } catch (error) {
      alert("Failed to delete student.");
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>
        {students?.length > 0 && (
          <Table
            striped
            bordered
            hover
            className="react-bootstrap-table"
            id="dataTable"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Registration No</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.studentId}>
                  <td>{stu.studentId}</td>
                  <td>{stu.firstName}</td>
                  <td>{stu.lastName}</td>
                  <td>{stu.registrationNo}</td>
                  <td>{stu.email}</td>
                  <td>{stu.course}</td>
                  <td>
                    <Button
                      className="mr-2"
                      variant="primary"
                      onClick={(event) => handleUpdate(event, stu)}
                    >
                      Update
                    </Button>{" "}
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={(event) =>
                        stu.studentId && handleDelete(event, stu.studentId)
                      }
                    >
                      Delete
                    </Button>
                    <UpdateStudentModal />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <ButtonToolbar>
          <Button variant="primary" onClick={(event) => handleAdd(event)}>
            Add Student
          </Button>
          <AddStudentModal />
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default Manage;
