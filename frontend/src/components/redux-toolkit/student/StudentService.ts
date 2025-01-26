import axios from "axios";
import { Student } from "./StudentSlice";

const BASE_URL = "http://127.0.0.1:8000/students/";

// Fetch all students
export const fetchStudents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Add a new student
export const createStudent = async (student: Student) => {
  const response = await axios.post(BASE_URL, student);
  return response.data;
};

// Update a student
export const editStudent = async (studentId: number, student: Student) => {
  const response = await axios.put(`${BASE_URL}${studentId}/`, {
    firstName: student.firstName,
    lastName: student.lastName,
    registrationNo: student.registrationNo,
    email: student.email,
    course: student.course,
  });
  return response.data;
};

// Delete a student
export const removeStudent = async (studentId: number) => {
  const response = await axios.delete(`${BASE_URL}${studentId}/`);
  return response.data;
};


// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { Student } from "./StudentSlice";

// export const getStudents = createAsyncThunk(
//   "students/getStudents",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/students/");
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const addStudent = createAsyncThunk(
//   "students/addStudents",
//   async (payload: { student: Student }, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/students/`,
//         payload.student
//       );
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const updateStudent = createAsyncThunk(
//   "students/updateStudents",
//   async ({ studentId, student }: { studentId: number, student: Student }, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/students/${studentId}/`,
//         {
//           firstName: student.firstName,
//           lastName: student.lastName,
//           registrationNo: student.registrationNo,
//           email: student.email,
//           course: student.course,
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const deleteStudent = createAsyncThunk(
//   "students/deleteStudent",
//   async (studentId: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(
//         `http://127.0.0.1:8000/students/${studentId}/`
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data || "Failed to delete student"
//       );
//     }
//   }
// );
