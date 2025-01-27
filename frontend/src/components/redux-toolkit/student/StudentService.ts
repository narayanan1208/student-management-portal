import axios from "axios";
import { Student } from "./StudentSlice";

const BASE_URL = "http://127.0.0.1:8000/students/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
    console.log("Access Token in Interceptor:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all students
export const fetchStudents = async () => {
  const response = await axiosInstance.get(BASE_URL);
  return response.data;
};

// Add a new student
export const createStudent = async (student: Student) => {
  const response = await axiosInstance.post(BASE_URL, student);
  return response.data;
};

// Update a student
export const editStudent = async (studentId: number, student: Student) => {
  const response = await axiosInstance.put(`${BASE_URL}${studentId}/`, {
    standard: student.standard,
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
  const response = await axiosInstance.delete(`${BASE_URL}${studentId}/`);
  return response.data;
};

