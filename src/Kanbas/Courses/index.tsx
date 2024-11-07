import Modules from "./Modules";
import { courses } from "../Database";
import Home from "./Home";
import { Route, Routes, useLocation, useParams } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import CoursesNavigation from "./Navigation";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import { ViewProvider } from "./Quizzes/View";
import EditorNavigation from "./Quizzes/EditorNavigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();


  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const newQuizId = (quizzes.length + 1).toString();


  return (
    <div id="wd-courses">
      

      <h2 id="wd-course-title" className="text-danger"><FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name} &gt; {pathname.split("/")[4]} &gt; {pathname.split("/")[5]}</h2>

      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <ViewProvider>
            <Routes>
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:id" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes newQuizId={newQuizId} quizzes={quizzes} />} />
              <Route path="Quizzes/:qid" element={<QuizDetails />} />
              <Route path="Quizzes/:qid/Editor/*" element={<EditorNavigation newQuizId={newQuizId} quizzes={quizzes}/>} />
              <Route path="Quizzes/:qid/Preview/*" element={<QuizPreview />} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
          </ViewProvider>
        </div>

      </div>
    </div>
  );
}
