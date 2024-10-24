import React from "react";
import QuizEditor from "./QuizEditor"
import QuizEditorDetails from "./QuizEditorDetails"
import QuizEditorQuestions from "./QuizEditorQuestions"
import { Navigate, Route, Routes, useParams } from "react-router";

export default function EditorNavigation() {
    const { cid, qid } = useParams()
    return (
        <div id="wd-quiz-editor-navigation"> 
            <QuizEditor />
            <Routes>
                <Route path={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/*`}element={<Navigate to="Details"/>} />
                <Route path="Details" element={<QuizEditorDetails />} />
                <Route path="Questions" element={<QuizEditorQuestions />} />
            </Routes>
        </div>
    );
}