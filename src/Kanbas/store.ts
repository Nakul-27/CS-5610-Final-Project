import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./Courses/Quizzes/questionsReducer";
import quizzesReducer from "./Courses/Quizzes/quizzesReducer"

const store = configureStore({

  reducer: {
    questionsReducer,
    quizzesReducer,
  },
});
export default store;