import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

export default function QuizEditorQuestions() {
    const {cid, qid} = useParams()
    return (
        <div className="container-fluid">
            <div id="wd-quiz-editor-questions" className="p-2 row">

            <div className="row-auto d-flex justify-content-center mb-3">
            <button id="wd-add-question-btn" className="btn btn-lg btn-secondary fs-6 rounded-1 float-end me-1">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
            Add Question</button>
            </div>

            <hr />

            <div className="row mt-2 mb-4">
            <div className="col">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                    <button className="btn btn-secondary rounded-1 me-2" type="submit">Cancel</button>
                </Link>
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                    <button className="btn btn-danger rounded-1" type="submit">Save</button>
                </Link>
            </div>
        </div>


            </div>
            

        </div>
    )

}