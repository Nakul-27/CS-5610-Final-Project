// import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
// import CoursesNavigation from "./Navigation";
// import Modules from "./Modules";
// import Home from "./Home";
// import Assignments from "./Assignments";
// import AssignmentEditor from "./Assignments/Editor";
// import { FaAlignJustify } from "react-icons/fa";
// import PeopleTable from "./People/Table";
// import { useEffect, useState } from "react";
// import * as peopleClient from "../Courses/People/client"
// import Quizzes from "./Quizzes";
// import QuizDetails from "./Quizzes/QuizDetails";
// import EditorNavigation from "./Quizzes/EditorNavigation";
// import QuizPreview from "./Quizzes/QuizPreview";
// import QuizPreviewResults from "./Quizzes/QuizPreviewResults";
// import TakeQuiz from "./Quizzes/QuizPreview";
// import QuizResults from "./Quizzes/QuizPreviewResults";
// import { useSelector } from "react-redux";



// export default function Courses({ courses }: { courses: any[]}) {


//   const { pathname } = useLocation();
//   const { cid } = useParams();
 
//   const course = courses.find((course:any) => course._id === cid);

//   const {quizzes} = useSelector((state: any) => state.quizzesReducer);
//   const newQuizId = (quizzes.length + 1).toString();

//     return (
//       <div id="wd-courses">
//         <h2 className="text-danger"><FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name} &gt; {pathname.split("/")[4]}</h2>
//         <hr />
//         <div className="d-flex">
//         <div className="d-none d-md-block">
//             <CoursesNavigation />
//           </div>
//           <div className="flex-fill">
//             <Routes>
//               <Route path="/" element={<Navigate to="Home" />} />
//               <Route path="Home" element={<Home />} />
//               <Route path="Modules" element={<Modules />} />
//               <Route path="Assignments" element={<Assignments />} /> 
//               <Route path="Assignments/:aid" element={<AssignmentEditor/>} />
//               <Route path="Quizzes" element={<Quizzes newQuizId={newQuizId} quizzes={quizzes}/>} />
//               <Route path="Quizzes/:qid" element={<QuizDetails />} />
//               <Route path="Quizzes/:qid/Editor/*" element={<EditorNavigation newQuizId={newQuizId} quizzes={quizzes}/>} />
//               <Route path="Quizzes/:qid/Preview/*" element={<QuizPreview />} />
//               <Route path="Quizzes/:qid/PreviewResults" element={<QuizPreviewResults />} />
//               <Route path="Quizzes/:qid/TakeQuiz" element={<TakeQuiz />} />
//               <Route path="Quizzes/:qid/QuizResults" element={<QuizResults />} />
//               <Route path="People" element={<PeopleTable />} />
//             </Routes>
//       </div></div>
//       </div>
//   );}

import Modules from "./Modules";
import Home from "./Home";
import { Route, Routes, useLocation, useParams } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import CoursesNavigation from "./Navigation";
import CourseStatus from "./Home/Status";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import { ViewProvider } from "./Quizzes/View";
import EditorNavigation from "./Quizzes/EditorNavigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizPreviewResults from "./Quizzes/QuizPreviewResults";
import TakeQuiz from "./Quizzes/TakeQuiz";
import QuizResults from "./Quizzes/QuizResults";

export default function Courses({ courses }: {
  courses: any[];
}) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const newQuizId = (quizzes.length + 1).toString();

  const [setPublished, setNewPublished] = useState(false)
  
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
              <Route path="Assignments/new" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes newQuizId={newQuizId} quizzes={quizzes} setPublished={setPublished} setNewPublished={setNewPublished}/>} />
              <Route path="Quizzes/:qid" element={<QuizDetails />} />
              <Route path="Quizzes/:qid/Editor/*" element={<EditorNavigation newQuizId={newQuizId} quizzes={quizzes} setPublished={setPublished} setNewPublished={setNewPublished}/>} />
              <Route path="Quizzes/:qid/Preview/*" element={<QuizPreview />} />
              <Route path="Quizzes/:qid/PreviewResults" element={<QuizPreviewResults />} />
              <Route path="Quizzes/:qid/TakeQuiz" element={<TakeQuiz />} />
              <Route path="Quizzes/:qid/QuizResults" element={<QuizResults />} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
          </ViewProvider>
        </div>

        
      </div>
    </div>
  );
}

  