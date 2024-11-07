import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { addQuestion, deleteQuestion, updateQuestion, resetQuestions } from "./questionsReducer";
import { useDispatch, useSelector } from "react-redux";
import Editor from 'react-simple-wysiwyg';
import { FaTrash } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";



export default function QuizEditorQuestions({quiz, setQuizQuestions,setNewQuizQuestions,handleSaveQuestions,handleCancelQuestions}:{quiz:any, setQuizQuestions:any, setNewQuizQuestions:any, handleSaveQuestions:()=>void,handleCancelQuestions:()=>void}) {
    const { cid, qid } = useParams()
    const dispatch = useDispatch()

    const { questions } = useSelector((state: any) => state.questionsReducer); 

    const [showQuestionInput, setShowQuestionInput] = useState(false);

    const [newQuestionTitle, setNewQuestionTitle] = useState("");
    const [newQuestionType, setNewQuestionType] = useState("Select Question Type");
    const [newQuestionPoints, setNewQuestionPoints] = useState("");
    const [newQuestionDescription, setNewQuestionDescription] = useState("");
    const [newQuestionAnswers, setNewQuestionAnswers] = useState<string[]>([""]);
    const [newQuestionCorrectAnswer, setNewQuestionCorrectAnswer] = useState("");
    
    const [currentEditingQuestionId, setCurrentEditingQuestionId] = useState(null);


//----------------------reducer functions for answers (adding/editing/deleting possible answers for each question)--------------//
    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...newQuestionAnswers];
        updatedAnswers[index] = value;
        setNewQuestionAnswers(updatedAnswers);
    };

    const handleAddAnotherAnswer = () => {
        setNewQuestionAnswers([...newQuestionAnswers, ""]);
    };

    const handleDeleteAnswer = (index: number) => {
        const updatedAnswers = newQuestionAnswers.filter((_, i) => i !== index);
        setNewQuestionAnswers(updatedAnswers);
    };

    const handleCorrectAnswerChange = (index: number) => {
        setNewQuestionCorrectAnswer(newQuestionAnswers[index]);
    };
//------------------------------------------------------------------------------------------------------------------------------//

    const handleAddOrUpdateQuestion = () => {
        const newQuestion = {
            _id: (questions.length + 1).toString(),
            quizId: qid,
            courseId: cid,
            title: newQuestionTitle,
            type: newQuestionType,
            points: newQuestionPoints,
            description: newQuestionDescription,
            answers: newQuestionAnswers,
            correct_answer: newQuestionCorrectAnswer,
        };
        const updatedQ = {
            _id: currentEditingQuestionId,
            quizId: qid,
            courseId: cid,
            title: newQuestionTitle,
            type: newQuestionType,
            points: newQuestionPoints,
            description: newQuestionDescription,
            answers: newQuestionAnswers,
            correct_answer: newQuestionCorrectAnswer,
        }
    
        if (currentEditingQuestionId) {

            dispatch(updateQuestion(updatedQ));
            setCurrentEditingQuestionId(null)
        } else {
            dispatch(addQuestion(newQuestion));
        }

        resetQuestion();
        setShowQuestionInput(false);
        
    };



    const resetQuestion = () => {

        setNewQuestionTitle("");
        setNewQuestionType("Select Question Type")
        setNewQuestionPoints("");
        setNewQuestionDescription("");
        setNewQuestionAnswers([""]);
        setNewQuestionCorrectAnswer("");
    }

    const handleEditQuestion = (question: any) => {
        setNewQuestionTitle(question.title);
        setNewQuestionType(question.type);
        setNewQuestionPoints(question.points);
        setNewQuestionDescription(question.description);
        setNewQuestionAnswers(question.answers);
        setNewQuestionCorrectAnswer(question.correct_answer);
        setCurrentEditingQuestionId(question._id);
        setShowQuestionInput(true);
    };

    const handleDeleteQuestion = (question:any) => {

        dispatch(deleteQuestion(question._id))


    }

    
    return (
        <div className="container-fluid">


            <div id="wd-quiz-editor-questions" className="p-2 row">

                
                        {questions.filter((q:any)=> q.quizId===qid && q.courseId===cid)
                        .map((question:any)=>(
                                <div className="row mb-3">

                                    <ul className="list-group rounded-0 border-0">
                                        <li className="list-group-item border-0">

                                            <ul className="list-group rounded-0 border">
                                                <li className="list-group-item border" style={{ backgroundColor: '#f0f0f0' }}>
                                                    <div className="row-auto mb-2">
                                                        <div className="col float-start me-2"><BsGripVertical /></div>
                                                        <div className="col float-start">{question.title}</div>
                                                        <div className="col float-end">{question.points} Pts</div>
                                                    </div>
                                                </li>

                                                <li className="list-group-item border">
                                                    <div className="row float-end">
                                                        <div className="col"><FaPencil onClick={() => handleEditQuestion(question)} /></div>
                                                        <div className="col"><FaTrash onClick={()=>handleDeleteQuestion(question)} /></div></div>
                                                    <br />
                                                    <div className="row ms-4">
                                                        {question.description}
                                                    </div>
                                                    <br />
                                                </li>
                                            </ul>

                                        </li>

                                    </ul>

                                </div>
                        ))}



                <div className="row-auto d-flex justify-content-center mb-3">
                    <button id="wd-add-question-btn" className="btn btn-lg btn-secondary fs-6 rounded-1 float-end me-1" onClick={() => {setShowQuestionInput(true)}}>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Add Question</button>
                </div>

                <hr />

                {showQuestionInput && (
                    <>
                        <div className="row mb-5">
                            <div className="col-auto">
                                <input id="wd-question-title" placeholder="New Question" type="text" className="form-control" style={{ width: "100%" }}
                                    value={newQuestionTitle} onChange={(e) => setNewQuestionTitle(e.target.value)} />
                            </div>


                            <div className="col-auto">
                                <select id="wd-question-type" className="form-select" value={newQuestionType} 
               
                                onChange={(e) => {setNewQuestionAnswers([""]); setNewQuestionCorrectAnswer(""); setNewQuestionDescription(""); setNewQuestionType(e.target.value.toString())}}>
                                    <option value="Select Question Type">Select Question Type</option>
                                    <option value="Multiple Choice">Multiple Choice</option>
                                    <option value="True or False">True or False</option>
                                    <option value="Fill in the Blank">Fill in the Blank</option>
                                </select>
                            </div>

                            <div className="col-auto">
                                <label htmlFor="wd-question-points" className="form-label float-end mt-1">Pts</label>
                                <input id="wd-question-points" type="text" className="form-control float-end me-3" style={{ width: "30%" }}
                                    value={newQuestionPoints} onChange={(e) => setNewQuestionPoints(e.target.value)} />
                            </div>
                        </div>

                        <hr />


                        {/* ---------------------------------------MULTIPLE CHOICE----------------------------------------- */}

                        {newQuestionType === "Multiple Choice" && (
                            <>

                        <div className="row">
                            <p>Enter your question and multiple answers, then select the one correct answer</p>

                        </div>
                        <div className="row">
                            <h5 style={{ fontWeight: "bold" }}>Question:</h5>
                        </div>

                        <div className="row mb-4">
                            <Editor value={newQuestionDescription} onChange={(e) => setNewQuestionDescription(e.target.value)} />
                        </div>
                                <div className="row">
                                    <h5 style={{ fontWeight: "bold" }}>Answers:</h5>
                                </div>
                                {newQuestionAnswers.map((answer, index) => (
                                    <div className="row mb-1" key={index}>
                                        <ul className="list-group rounded-0 border">
                                            <li className="list-group-item border-0">
                                                <div className="row">
                                                    <div className="col-auto" >
                                                        <input type="checkbox" className="me-3" id={`wd-answer-${index}`}
                                                            onChange={() => handleCorrectAnswerChange(index)}
                                                        />
                                                    </div>
                                                    <div className="col-auto">
                                                        <label htmlFor={`wd-answer-${index}`} className="form-label">Possible Answer</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        <input id={`wd-answer-${index}`} type="text" className="form-control me-3"
                                                            value={answer}
                                                            onChange={(e) => handleAnswerChange(index, e.target.value)} />
                                                    </div><FaTrash className="col-auto mt-2" onClick={() => handleDeleteAnswer(index)} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                                <div className="row-auto float-end">
                                    <button id="wd-add-answer-btn" className="btn btn-link btn-lg fs-6 rounded-1 float-end me-1" onClick={handleAddAnotherAnswer}>
                                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                                        Add Another Answer
                                    </button>
                                </div>
                            </>
                        )}
                        {/* ----------------------------------------------------------------------------------------------- */}



                        {/* ---------------------------------------TRUE OR FALSE------------------------------------------- */}
                        {newQuestionType === "True or False" && (
                            <>
                        
                        <div className="row">
                            <p>Enter your question text, then select if True or False is the correct answer</p>

                        </div>
                        <div className="row">
                            <h5 style={{ fontWeight: "bold" }}>Question:</h5>
                        </div>

                        <div className="row mb-4">
                            <Editor value={newQuestionDescription} onChange={(e) => setNewQuestionDescription(e.target.value)} />
                        </div>
                                <div className="row">
                                    <h5 style={{ fontWeight: "bold" }}>Answers:</h5>
                                </div>
                                <div className="row mb-1">
                                    <ul className="list-group rounded-0 border">
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <input
                                                        type="radio"
                                                        name="trueFalseAnswer"
                                                        className="me-3"
                                                        onChange={() => setNewQuestionCorrectAnswer("True")}
                                                        checked={newQuestionCorrectAnswer === "True"}
                                                    />
                                                </div>
                                                <div className="col">True</div>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <input
                                                        type="radio"
                                                        name="trueFalseAnswer"
                                                        className="me-3"
                                                        onChange={() => setNewQuestionCorrectAnswer("False")}
                                                        checked={newQuestionCorrectAnswer === "False"}
                                                    />
                                                </div>
                                                <div className="col">False</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                        {/* ------------------------------------------------------------------------------------------------ */}





                        {/* ---------------------------------------FILL IN THE BLANKS----------------------------------------- */}
                        {newQuestionType === "Fill in the Blank" && (
                            <>
                        
                            <div className="row">
                                <p>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a
                                    small text box to type their answer
                                </p>
    
                            </div>

                        <div className="row">
                            <h5 style={{ fontWeight: "bold" }}>Question:</h5>
                        </div>

                        <div className="row mb-4">
                            <Editor value={newQuestionDescription||"______"} onChange={(e) => setNewQuestionDescription(e.target.value)} />

                        </div>
                                <div className="row mb-3">
                                    <h5 style={{ fontWeight: "bold" }}>Answer:</h5>
                                </div>
                                {newQuestionAnswers.map((answer, index) => (
                                    <div className="row mb-5" key={index}>
                                        <div className="col-auto">
                                            <label htmlFor={`wd-answer-${index}`} className="form-label">Correct Answer</label>
                                        </div>
                                        <div className="col-auto">
                                        <input type="text" id={`wd-answer-${index}`} value={newQuestionCorrectAnswer}
                                        onChange={(e) => {setNewQuestionCorrectAnswer(e.target.value)}}/>
                                        </div>
                                        </div>

                                ))}

                            </>
                        )}
                        {/* ------------------------------------------------------------------------------------------------- */}







                        <div className="row mt-2 mb-4">
                            <div className="col">

                                <button className="btn btn-secondary rounded-1 me-2" type="submit" onClick={() => { resetQuestion() ;setShowQuestionInput(false); }}>Cancel</button>

                                <button className="btn btn-danger rounded-1" type="submit"
                                    onClick={
                                        handleAddOrUpdateQuestion

                                    }>Update Question</button>

                            </div>
                        </div>
                    </>
                )}


                <hr />

                
                <div className="row mt-2 mb-4">
                    <div className="col">
                        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Details`}>
                            <button className="btn btn-secondary rounded-1 me-2" type="submit" onClick={()=>{resetQuestion();handleCancelQuestions()}} >Cancel</button>
                        </Link>
                        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Details`}>
                            <button className="btn btn-danger rounded-1" type="submit"
                            onClick={()=>{resetQuestion();handleSaveQuestions()}}>Save</button>
                        </Link>
                    </div>
                </div>


            </div>
  

        </div>
    )

}

