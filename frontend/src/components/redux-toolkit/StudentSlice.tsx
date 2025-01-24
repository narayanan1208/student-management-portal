import { createSlice } from "@reduxjs/toolkit";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./StudentService";

export interface Student {
  studentId?: number;
  firstName: string;
  lastName: string;
  registrationNo: string;
  email: string;
  course: string;
}

export interface StudentsState {
  students: Student[];
  status: "idle" | "loading" | "success" | "failed";
  error: null | string | unknown;
  addModalShow: boolean;
  editModalShow: boolean;
  isUpdated: boolean;
  updatedStudent: Student[];
}

const initialState: StudentsState = {
  students: [],
  status: "idle",
  error: null,
  addModalShow: false,
  editModalShow: false,
  isUpdated: false,
  updatedStudent: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setAddModalShowTrue: (state) => {
      state.addModalShow = true;
    },
    setAddModalShowFalse: (state) => {
      state.addModalShow = false;
    },
    setEditModalShowTrue: (state) => {
      state.editModalShow = true;
    },
    setEditModalShowFalse: (state) => {
      state.editModalShow = false;
    },
    setIsUpdatedTrue: (state) => {
      state.isUpdated = true;
    },
    setIsUpdatedFalse: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updatedStudentIndex = state.students.findIndex(
          (s) => s.studentId === action.payload.studentId
        );
        if (updatedStudentIndex !== -1) {
          state.students[updatedStudentIndex] = action.payload;
        }
        state.status = "success";
        state.editModalShow = false;
        state.isUpdated = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.editModalShow = false;
        state.isUpdated = false;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student.studentId !== action.meta.arg
        ); // Remove deleted student
        state.isUpdated = true;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isUpdated = false;
      })
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state) => {
        state.status = "success";
        state.students = [];
        state.addModalShow = false;
        state.isUpdated = true;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.addModalShow = false;
        state.isUpdated = false;
      });
  },
});

export const {
  setAddModalShowTrue,
  setAddModalShowFalse,
  setEditModalShowTrue,
  setEditModalShowFalse,
  setIsUpdatedTrue,
  setIsUpdatedFalse,
} = studentSlice.actions;

export default studentSlice.reducer;
