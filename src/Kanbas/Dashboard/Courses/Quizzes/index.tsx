import { useNavigate, useParams } from "react-router";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical, IoRocketOutline } from "react-icons/io5";
import AssignmentControlButtons from "../Assignments/AssignmentControlButtons";
import { useState } from "react";
import StudentViewButton from "./StudentViewButton";
import { FaCircle, FaPlus } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { useViewContext } from "./View";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, publishQuiz, unpublishQuiz } from "./quizzesReducer";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import QuizRemove from "./QuizRemove";
import ProtectedRouteFaculty from "../../Account/ProtectedRouteFaculty";
import { deleteAllQuestions} from "./questionsReducer";
import ProtectedRouteStudent from "../../Account/ProtectedRouteStudent";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { CiNoWaitingSign } from "react-icons/ci";


export default function Quizzes({newQuizId, quizzes}:{newQuizId:any, quizzes:any}) {
    const { cid } = useParams()
    const { isStudentView, toggleView } = useViewContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quizToDelete, setQuizToDelete] = useState("")

    const [published, setPublished] = useState(false); 


    const handlePublishToggle = (quizId:any) => {
        setPublished(prevState => !prevState); 
 
        if (!published) {
            dispatch(publishQuiz({ quizId: quizId, courseId: cid }));
        } else {
            dispatch(unpublishQuiz({ quizId: quizId, courseId: cid }));
        }
    };
    return (
        <>
            <ProtectedRouteFaculty><StudentViewButton
                isStudentView={isStudentView}
                onClick={toggleView}
            /></ProtectedRouteFaculty>

            <div id="wd-quizzes" className="p-3">
                <div className="row mb-5">
                    <div className="col">
                        <input type="search" className="form-control rounded-0 me-1 wd-search-bar" id="wd-search-assignment"
                            placeholder="Search for Quiz" style={{ width: "300px" }} />
                    </div>

                    <ProtectedRouteFaculty>{isStudentView ?
                        (<><div className="col mb-3">

                            <div className="col">
                                <button id="wd-quiz-menu-btn" className="btn btn-lg btn-secondary fs-6 rounded-1 float-end">
                                    <FiMoreVertical /></button>
                            </div>

                            <div className="col text-nowrap">
                                <button id="wd-add-quiz-btn" className="btn btn-lg btn-danger fs-6 rounded-1 float-end me-1"
                                    onClick={() =>{navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizId}/Editor/Details`);}}>
                                        
                                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                                    Quizzes</button>
                            </div>
                        </div> <hr /></>) : null}</ProtectedRouteFaculty>
                </div>


                <div className="row">
                    <ul id="wd-quiz-list" className="list-group rounded-0">
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-assignments-title p-3 ps-2 bg-secondary">
                                <IoMdArrowDropdown className="me-2 fs-5" />
                                Assignment Quizzes
                            </div>
                            <ul className="wd-assignments list-group rounded-0">
                            <ProtectedRouteFaculty>{quizzes
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
                                                    <strong>{`${quiz.availability}`}</strong> {`${quiz.available_from}`} - {`${quiz.available_until}`} | <strong>Due</strong> {`${quiz.due_date}`} | {`${quiz.points}`} pts | {`${quiz.number_questions}`} Questions

                                                </div>
                                            </div>

                                            {isStudentView ?
                                                <div className="ms-auto d-flex align-items-center">
                                          
                                                    <FaTrash className="me-2" data-bs-toggle="modal" data-bs-target="#wd-add-quiz-dialog" onClick = {() => setQuizToDelete(quiz._id)}/>
                                                    <div className="d-flex align-items-center">
                                                    <span className="me-1 position-relative" onClick={()=>handlePublishToggle(quiz._id)} >

                                                    {quiz.published ? ( 
                                                        <FaCheckCircle style={{ top: "0.5px" }} className="me-1 text-success position-relative fs-5" />
                                                    ) : ( 
                                                        <CiNoWaitingSign className="fs-5 position-relative me-1" style={{ top: "0.5px" }}/>
                                                    )}
                                                    </span>

                                                    <IoEllipsisVertical className="fs-6" />
                                                    </div>

                                                    <QuizRemove
                                                            dialogTitle="Delete Quiz"
                                                            deleteQuiz={(id) => {
                                                                dispatch(deleteQuiz(id));
                                                                dispatch(deleteAllQuestions(id))
                                                                setQuizToDelete(""); 
                                                            }}
                                                            quizId={quizToDelete} 
                                                        />
                                                </div> : null}
                                        </li>
                                    ))
                                }</ProtectedRouteFaculty>


                        <ProtectedRouteStudent>{quizzes
                                    .filter((quiz: any) => quiz.course === cid)
                                    .map((quiz: any) => (
                                        <>
                                        {quiz.published && ( <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                                            <div className="d-flex align-items-center">

                                                <IoRocketOutline className="ms-2 me-3 fs-3 text-success" />
                                                <div className={`wd-${quiz._id}`}>
                                                    <a className="wd-quiz-link" href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                                                        <strong>{quiz.title}</strong>
                                                    </a>
                                                    <br />
                                                    <strong>{`${quiz.availability}`}</strong> {`${quiz.available_from}`} - {`${quiz.available_until}`} | <strong>Due</strong> {`${quiz.due_date}`} | {`${quiz.points}`} pts | {`${quiz.number_questions}`} Questions

                                                </div>
                                            </div>

                                            
                                        </li>)}</>
                                    ))
                                }</ProtectedRouteStudent>
                            </ul>
                        </li >
                    </ul>
                </div>


            </div>

        </>
    );
}
