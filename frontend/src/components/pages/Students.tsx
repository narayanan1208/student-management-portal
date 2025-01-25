import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { getStudents } from "../redux-toolkit/StudentService";
import { RootState, AppDispatch } from "../../../store";
import "../../App.css";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { students, status } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

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
        )}
        {students?.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>
              No student list to display.{' '}
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => navigate("/manage")}
              >
                Click here to add students.
              </span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
