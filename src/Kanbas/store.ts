import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./reducer";
import quizzesReducer from "./Courses/Quizzes/quizzesReducer";
import questionsReducer from "./Courses/Quizzes/questionsReducer"
import resultsReducer from "./Courses/Quizzes/resultsReducer"

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    enrollmentReducer,
    quizzesReducer,
    questionsReducer,
    resultsReducer,

  },
});

export default store;
