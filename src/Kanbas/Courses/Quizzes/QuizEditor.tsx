import { CiNoWaitingSign } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";
import { useLocation, useParams } from "react-router";

export default function QuizEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams()
    return (

    <div id="wd-quiz-editor" className="p-3">

        <div className="row mb-3 float-end">
            <div className="col text-nowrap">
                Points 0
            </div>
            <div className="col text-nowrap" style={{color:"grey"}}>
            <CiNoWaitingSign className="fs-5 me-1"/> Not Published
            </div>
            <div className="col">
            <button id="wd-quiz-menu-btn" className="btn btn-sm btn-secondary fs-6 rounded-1 float-end" style={{position:"relative", top:"-4px"}}>
            <FiMoreVertical /></button>
            </div>
        </div>

        <hr style={{ border: "1px solid #ccc", width: "100%", margin: "0" }} className="mb-2"/>

        <div className="row">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Details`} className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>
                    Details
                    </a>
                </li>
                <li className="nav-item">
                    <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
                    className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
                    Questions
                    </a>
                </li>
            </ul>
        </div>
        

    </div>
    );
}