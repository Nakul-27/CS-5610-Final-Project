import React, { useState } from "react";
import QuizEditor from "./QuizEditor"
import QuizEditorDetails from "./QuizEditorDetails"
import QuizEditorQuestions from "./QuizEditorQuestions"
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz,updateQuiz } from "./quizzesReducer";
import { deleteQuestion, setQuestions } from "./questionsReducer";


export default function EditorNavigation({newQuizId, quizzes}:{newQuizId:any, quizzes:any}) {
    const { cid, qid } = useParams()

    const quiz = quizzes.find((q:any) => q._id === qid && q.course === cid);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [setQuizTitle, setNewQuizTitle] = useState(quiz ? quiz.title : "New Quiz")
    const [setQuizAvailableFrom, setNewQuizAvailableFrom] = useState(quiz ? quiz.available_from : "")
    const [setQuizAvailableUntil, setNewQuizAvailableUntil] = useState(quiz ? quiz.available_until : "")
    const [setQuizDueDate, setNewQuizDueDate] = useState(quiz ? quiz.due_date : "")
    const [setQuizPoints, setNewQuizPoints] = useState(quiz ? quiz.points : "0")
    const [setQuizNumberQuestions, setNewQuizNumberQuestions] = useState(quiz ? quiz.number_questions : "0")
    const [setQuizScore, setNewQuizScore] = useState(quiz ? quiz.score : "")
    const [setQuizType, setNewQuizType] = useState(quiz ? quiz.type : "Graded Quiz")
    const [setQuizAssignmentGroup, setNewQuizAssignmentGroup] = useState(quiz ? quiz.assignment_group : "QUIZZES")
    const [setQuizShuffle, setNewQuizShuffle] = useState(quiz ? quiz.shuffle_answers : true)
    const [setQuizTimeLimit, setNewQuizTimeLimit] = useState(quiz ? quiz.time_limit : "20")
    const [setQuizMultipleAttempts, setNewQuizMultipleAttempts] = useState(quiz ? quiz.multiple_attempts : false)
    const [setQuizNumberAttempts, setNewQuizNumberAttempts] = useState(quiz ? quiz.number_attempts : "1")
    const [setQuizShowCorrectAnswers, setNewQuizShowCorrectAnswers] = useState(quiz ? quiz.show_correct_answers : "Yes")
    const [setQuizAccessCode, setNewQuizAccessCode] = useState(quiz ? quiz.access_code : "None")
    const [setQuizOneQuestionAtATime, setNewQuizOneQuestionAtATime] = useState(quiz ? quiz.one_question_at_a_time : true)
    const [setQuizWebcamRequired, setNewQuizWebcamRequired] = useState(quiz ? quiz.webcam_required : false)
    const [setQuizLockQuestions, setNewQuizLockQuestions] = useState(quiz ? quiz.lock_questions_after_answering : false)

    const [setQuizDescription, setNewQuizDescription] = useState(quiz ? quiz.description : "")
    const [setQuizQuestions, setNewQuizQuestions] = useState(quiz ? quiz.questions : [])

    const { questions } = useSelector((state: any) => state.questionsReducer); 

    const [previousQuestions, setPreviousQuestions] = useState<any[]>([...questions]);

    const filteredQuestions = questions.filter(
        (question:any) => question.quizId === qid && question.courseId === cid
      );

    const handleSaveQuestions = () => {

        setNewQuizQuestions([...filteredQuestions]);
    };

    const handleCancelQuestions = () => {

        if (!quiz || !quiz.questions) {
            filteredQuestions.forEach((q:any) => {
            dispatch(deleteQuestion(q._id)); 
            });
        }
        dispatch(setQuestions([...previousQuestions]))
    }

    const handleUpdateQuiz = () => {

 
        const newQuizQuestions = filteredQuestions.length;

        const newQuizPoints = filteredQuestions.reduce((total: number, question: any) => total + parseInt(question.points, 10), 0);

        

        if (quiz) {
            dispatch(updateQuiz({
                _id: qid,
                title: setQuizTitle,
                course: cid,
                availability: "Available",
                available_from: setQuizAvailableFrom,
                available_until: setQuizAvailableUntil,
                due_date: setQuizDueDate,
                points: newQuizPoints,
                number_questions: newQuizQuestions,
                score: setQuizScore,
                quiz_type: setQuizType,
                assignment_group: setQuizAssignmentGroup,
                shuffle_answers: setQuizShuffle,
                time_limit: setQuizTimeLimit,
                multiple_attempts: setQuizMultipleAttempts,
                number_attempts: setQuizNumberAttempts,
                show_correct_answers: setQuizShowCorrectAnswers,
                access_code: setQuizAccessCode,
                one_question_at_a_time: setQuizOneQuestionAtATime,
                webcam_required: setQuizWebcamRequired,
                lock_questions_after_answering: setQuizLockQuestions,
                description: setQuizDescription,
                published: false,
                questions: setQuizQuestions,
            }))
        
        } else {
            dispatch(addQuiz({                
                _id: newQuizId,
                title: setQuizTitle,
                course: cid,
                availability: "Available",
                available_from: setQuizAvailableFrom,
                available_until: setQuizAvailableUntil,
                due_date: setQuizDueDate,
                points: newQuizPoints,
                number_questions: newQuizQuestions,
                score: setQuizScore,
                quiz_type: setQuizType,
                assignment_group: setQuizAssignmentGroup,
                shuffle_answers: setQuizShuffle,
                time_limit: setQuizTimeLimit,
                multiple_attempts: setQuizMultipleAttempts,
                number_attempts: setQuizNumberAttempts,
                show_correct_answers: setQuizShowCorrectAnswers,
                access_code: setQuizAccessCode,
                one_question_at_a_time: setQuizOneQuestionAtATime,
                webcam_required: setQuizWebcamRequired,
                lock_questions_after_answering: setQuizLockQuestions,
                description: setQuizDescription,
                published: false,
                questions: setQuizQuestions,}))   
        }
    
    }

    const handleCancelQuiz = () => {
        if (quiz) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)
        }
        else {
            navigate(`/Kanbas/Courses/${cid}/Quizzes`)
        }
        

        if (!quiz || !quiz.questions) {
            filteredQuestions.forEach((q:any) => {
            dispatch(deleteQuestion(q._id)); 
            });
        }
        dispatch(setQuestions([...previousQuestions]))
    }



    return (
        <div id="wd-quiz-editor-navigation">
            <QuizEditor />
            <Routes>
                <Route path={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/*`} element={<Navigate to="Details" />} />
                <Route path="Details" element={<QuizEditorDetails 
                setQuizTitle={setQuizTitle} setQuizAvailableFrom={setQuizAvailableFrom} setQuizAvailableUntil={setQuizAvailableUntil} setQuizDueDate={setQuizDueDate} setQuizScore={setQuizScore}
                setQuizPoints={setQuizPoints} setQuizNumberAttempts={setQuizNumberAttempts} setQuizType={setQuizType} setQuizAssignmentGroup={setQuizAssignmentGroup} setQuizShuffle={setQuizShuffle} setQuizTimeLimit={setQuizTimeLimit} setQuizMultipleAttempts={setQuizMultipleAttempts}
                setQuizNumberQuestions={setQuizNumberQuestions} setQuizShowCorrectAnswers={setQuizShowCorrectAnswers} setQuizAccessCode={setQuizAccessCode} setQuizOneQuestionAtATime={setQuizOneQuestionAtATime} setQuizWebcamRequired={setQuizWebcamRequired} 
                setQuizLockQuestions={setQuizLockQuestions} setQuizDescription={setQuizDescription}
                setNewQuizTitle={setNewQuizTitle} setNewQuizAvailableFrom={setNewQuizAvailableFrom} setNewQuizAvailableUntil={setNewQuizAvailableUntil} setNewQuizDueDate={setNewQuizDueDate} setNewQuizScore={setNewQuizScore}
                setNewQuizPoints={setNewQuizPoints} setNewQuizNumberAttempts={setNewQuizNumberAttempts} setNewQuizType={setNewQuizType} setNewQuizAssignmentGroup={setNewQuizAssignmentGroup} setNewQuizShuffle={setNewQuizShuffle} setNewQuizTimeLimit={setNewQuizTimeLimit} setNewQuizMultipleAttempts={setNewQuizMultipleAttempts}
                setNewQuizNumberQuestions={setNewQuizNumberQuestions} setNewQuizShowCorrectAnswers={setNewQuizShowCorrectAnswers} setNewQuizAccessCode={setNewQuizAccessCode} setNewQuizOneQuestionAtATime={setNewQuizOneQuestionAtATime} setNewQuizWebcamRequired={setNewQuizWebcamRequired} 
                setNewQuizLockQuestions={setNewQuizLockQuestions} setNewQuizDescription={setNewQuizDescription}
                quizzes={quizzes} newQuizId={newQuizId} handleUpdateQuiz={handleUpdateQuiz} handleCancelQuiz={handleCancelQuiz}
                />} />
                <Route path="Questions" element={<QuizEditorQuestions quiz={quiz} setQuizQuestions={setQuizQuestions} setNewQuizQuestions={setNewQuizQuestions}  handleSaveQuestions={handleSaveQuestions} handleCancelQuestions={handleCancelQuestions}/>} />
            </Routes>
        </div>
    );
}
