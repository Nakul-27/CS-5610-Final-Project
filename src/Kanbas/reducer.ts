import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "./Database"

const initialState = {
  enrollments: initialEnrollments,
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
    enrollCourse: (state, { payload: { userId, courseId } }) => {
      const existingEnrollment = state.enrollments.some(
        (e: any) => e.user === userId && e.course === courseId
      );
      if (!existingEnrollment) {
        state.enrollments.push({
          _id: new Date().getTime().toString(),
          user: userId,
          course: courseId
        });
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter((e: any) => (
        !(e.user === userId && e.course === courseId)
      ));
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
