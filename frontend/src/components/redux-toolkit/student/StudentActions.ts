import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStudents,
  createStudent,
  editStudent,
  removeStudent,
} from "./StudentService";
import { Student } from "./StudentSlice";

// Fetch all students
export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (_, thunkAPI) => {
    try {
      return await fetchStudents();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch students");
    }
  }
);

// Add a new student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student: Student, thunkAPI) => {
    try {
      return await createStudent(student);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to add student");
    }
  }
);

// Update a student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (
    { studentId, student }: { studentId: number; student: Student },
    thunkAPI
  ) => {
    try {
      return await editStudent(studentId, student);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update student");
    }
  }
);

// Delete a student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId: number, thunkAPI) => {
    try {
      return await removeStudent(studentId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to delete student");
    }
  }
);
