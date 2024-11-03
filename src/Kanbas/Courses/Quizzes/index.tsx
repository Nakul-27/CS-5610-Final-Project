import * as db from "../../Database";
import { useNavigate, useParams } from "react-router";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoRocketOutline } from "react-icons/io5";
import AssignmentControlButtons from "../Assignments/AssignmentControlButtons";
import { useState } from "react";
import StudentViewButton from "./StudentViewButton";
import { FaPlus } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { useViewContext } from "./View";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "./quizzesReducer";


export default function Quizzes() {
    const { cid } = useParams()
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { isStudentView, toggleView } = useViewContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddQuiz = () => {
        const newQuizId = quizzes.length + 1;
        const newQuiz = {
            _id: newQuizId,
            title: `New Quiz ${newQuizId}`,
            course: cid,
            availability: "Available",
            // available_from: new Date().toLocaleDateString(),
            // available_until: new Date().toLocaleDateString(),
            // due_date: new Date().toLocaleDateString(),
            // points: 0,
            // number_questions: 0,
        };
        dispatch(addQuiz(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizId}/Editor/`);
    };
    return (
        <>
            <StudentViewButton
                isStudentView={isStudentView}
                onClick={toggleView}
            />

            <div id="wd-quizzes" className="p-3">
                <div className="row mb-5">
                    <div className="col">
                        <input type="search" className="form-control rounded-0 me-1 wd-search-bar" id="wd-search-assignment"
                            placeholder="Search for Quiz" style={{ width: "300px" }} />
                    </div>

                    {isStudentView ?
                        (<><div className="col mb-3">

                            <div className="col">
                                <button id="wd-quiz-menu-btn" className="btn btn-lg btn-secondary fs-6 rounded-1 float-end">
                                    <FiMoreVertical /></button>
                            </div>

                            <div className="col text-nowrap">
                                <button id="wd-add-quiz-btn" className="btn btn-lg btn-danger fs-6 rounded-1 float-end me-1"
                                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/new/Editor/`)}>
                                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                                    Quizzes</button>
                            </div>
                        </div> <hr /></>) : null}
                </div>

                <div className="row">
                    <ul id="wd-quiz-list" className="list-group rounded-0">
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-assignments-title p-3 ps-2 bg-secondary">
                                <IoMdArrowDropdown className="me-2 fs-5" />
                                Assignment Quizzes
                            </div>
                            <ul className="wd-assignments list-group rounded-0">
                                {quizzes
                                    .filter((quiz: any) => quiz.course === cid)
                                    .map((quiz: any) => (
                                        <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                                            <div className="d-flex align-items-center">

                                                <IoRocketOutline className="ms-2 me-3 fs-3 text-success" />
                                                <div className={`wd-${quiz._id}`}>
                                                    <a className="wd-quiz-link" href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                                                        <strong>{quiz.title}</strong>
                                                    </a>
                                                    <br />
                                                    <strong>{`${quiz.availability}`}</strong> {`${quiz.available_from}`} {`${quiz.available_until}`} | <strong>Due</strong> {`${quiz.due_date}`} | {`${quiz.points}`} pts | {`${quiz.number_questions}`} Questions

                                                </div>
                                            </div>

                                            {isStudentView ?
                                                <div className="ms-auto d-flex align-items-center">
                                                    <AssignmentControlButtons />
                                                </div> : null}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li >
                    </ul>
                </div>


            </div>



        </>
    );
}
