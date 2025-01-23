import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getStudents } from "../redux-toolkit/StudentService";
import { RootState, AppDispatch } from "../../../store";
import "../../App.css";

const Students = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, status } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(getStudents());
    }
  }, [dispatch]);

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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Students;
