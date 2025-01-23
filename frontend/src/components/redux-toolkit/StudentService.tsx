import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Student } from "./StudentSlice";

export const getStudents = createAsyncThunk("students/getStudents", async(_, thunkAPI) => {
  try {
      const response = await axios.get("http://127.0.0.1:8000/students/");
    return response.data;
  } catch(error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateStudent = createAsyncThunk(
  'students/updateStudents',
  async ({ student }: { student: Student }, thunkAPI) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/students/${student.studentId}/`, {
        firstName: student.firstName,
        lastName: student.lastName,
        registrationNo: student.registrationNo,
        email: student.email,
        course: student.course,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/students/${studentId}/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete student');
    }
  }
);
