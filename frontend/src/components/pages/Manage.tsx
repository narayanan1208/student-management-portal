import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import {
  getStudents,
  updateStudent,
  deleteStudent,
} from "../redux-toolkit/StudentService";
import { RootState, AppDispatch } from "../../../store";
import {
  setAddModalShowTrue,
  setEditModalShowTrue,
  setIsUpdatedTrue,
  Student,
} from "../redux-toolkit/StudentSlice";

const Manage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, status } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(getStudents());
    }
  }, [dispatch]);

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddModalShowTrue();
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>, student: Student) => {
    e.preventDefault();
    setEditModalShowTrue()
    dispatch(updateStudent({ student }));
  };

  const handleDelete = (
    e: MouseEvent<HTMLButtonElement>,
    studentId: number
  ) => {
    e.preventDefault();
    dispatch(deleteStudent(studentId));
    setIsUpdatedTrue();
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>
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
                    onClick={(event) => handleDelete(event, stu.studentId)}
                  >
                    Delete
                  </Button>
                  {/* <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated}
                              onHide={!editModalShow}/> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary" onClick={(event) => handleAdd(event)}>
            Add Student
          </Button>
          {/* <AddStudentModal show={addModalShow} setUpdated={setIsUpdated} onHide={!addModalShow}/> */}
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default Manage;
