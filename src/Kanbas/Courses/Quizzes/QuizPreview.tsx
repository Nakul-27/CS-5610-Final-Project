import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { CgDanger } from "react-icons/cg";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useRef, useEffect } from "react";


export default function QuizPreview() {
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { cid, qid } = useParams()
    const navigate = useNavigate();
    const quiz = quizzes.find((quiz: any) => quiz.course == cid && quiz._id == qid);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
    const questionContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (questionContainerRef.current) {
            questionContainerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [currentQuestionIndex]);
    
    const questions = quiz.questions || [];

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerSelection = (questionId: string, answer: any) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleSubmit = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Results`, { state: { userAnswers, questions, quizTitle: quiz.title  } });
    };


    return (
        <div className="container-fluid" id="wd-quiz-preview">

            {quizzes.filter((quiz:any)=>quiz.course == cid && quiz._id == qid)
            .map((quiz:any)=> (
                <>
            <div className="row mb-2">
                <h4 style={{ fontWeight: "bold" }}> {`${quiz.title}`} </h4>
             </div>

             <div className="row bg-danger bg-opacity-25 rounded" >
             <div className="col-auto"><CgDanger className="mt-3 text-danger" /></div><div className="col-auto mt-3"><p className="text-danger">This is a preview of the published version of the quiz</p></div>

             </div>

             <div className="row mt-4">
                <h4 style={{fontWeight:"bold"}}>Quiz Instructions</h4>
             </div>

             <hr />


                {questions.length > 0 && (
                    <>
                     <div className="row mt-3" ref={questionContainerRef}>

                        <ul className="list-group rounded-0 border-0">
                            <li className="list-group-item border-0">

                                <ul className="list-group rounded-0 border border-dark border-opacity-25">
                                    <li className="list-group-item border" style={{ backgroundColor: '#f0f0f0' }}>
                                        <div className="row-auto mb-3">
                                            <div className="col float-start me-2"></div>
                                            <div className="col float-start ms-2 text-body" style={{fontWeight:"bold"}}>{questions[currentQuestionIndex]?.title}</div>
                                            <div className="col float-end me-3 text-body" style={{fontWeight:"bold"}}>{questions[currentQuestionIndex]?.points} Pts</div>
                                        </div>
                                    </li>

                                    <li className="list-group-item border-0">
                                        <br />
                                        <div className="row ms-4">
                                            {questions[currentQuestionIndex]?.description}
                                        </div>
                 
                                    </li>

                                    <li className="list-group-item border-0">

                                        {(questions[currentQuestionIndex]?.type === "Multiple Choice" ) && 
                                        questions[currentQuestionIndex]?.answers?.map((answer: any, index: number) => (
                                            <>
                                            <hr className="ms-4" style={{width:"95%"}}/>
                                            <div className="row">
                                                <div className="col-auto ms-5" >
                                                    <input type="checkbox" 
                                                    checked={userAnswers[questions[currentQuestionIndex]._id] === answer}
                                                    onChange={() => handleAnswerSelection(questions[currentQuestionIndex]._id, answer)}
                                                    className="me-3" id={`wd-answer-${index}`}/>
                                                </div>
                                                <div className="col-auto">
                                                <label htmlFor={`wd-answer-${index}`} className="form-label">
                                                    {`${answer}`} 
                                                </label>
                                                </div>
                                            </div>  
                                            </>
                                        ))
                                    }

                                        {(questions[currentQuestionIndex]?.type === "True or False" ) && 
                                        questions[currentQuestionIndex]?.answers?.map((answer: any, index: number) => (
                                            <>
                                            
                                            <div className="row mb-2">
                                            <hr className="ms-4" style={{width:"95%"}}/>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <input
                                                        type="radio"
                                                        name="trueFalseAnswer"
                                                        className="ms-3"
                                                        checked={userAnswers[questions[currentQuestionIndex]._id] === "True"}
                                                        onChange={() => handleAnswerSelection(questions[currentQuestionIndex]._id, "True")}
                                                    />
                                                </div>
                                                <div className="col">True</div>
                                            </div>
                                            <hr className="ms-4" style={{width:"95%"}}/>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <input
                                                        type="radio"
                                                        name="trueFalseAnswer"
                                                        className="ms-3"
                                                        checked={userAnswers[questions[currentQuestionIndex]._id] === "False"}
                                                        onChange={() => handleAnswerSelection(questions[currentQuestionIndex]._id, "False")}
                                                    />
                                                </div>
                                                <div className="col">False</div>
                                            </div>
                                            </div>  
                                            </>
                                        ))
                                    }


                                        {(questions[currentQuestionIndex]?.type === "Fill in the Blank" ) && 
                                        questions[currentQuestionIndex]?.answers?.map((answer: any, index: number) => (
                                            <>
                                            
                                            <div className="row mb-2">
                                            <hr className="ms-4" style={{width:"95%"}}/>
                                            <div className="row"> 
                                                <input type="text" name="FillInBlank" className="ms-4" style={{width:"10%"}}
                                                value={userAnswers[questions[currentQuestionIndex]._id] || ""}
                                                onChange={(e) => handleAnswerSelection(questions[currentQuestionIndex]._id, e.target.value)}/>
                                                </div>
                                                
                                            </div>
                                            
                                       
                                            </>
                                        ))
                                    }


                                    </li>
                                </ul>
                                </li>
                                </ul>
                            </div>
                               
                        <div className="row mb-5">
                        <div className="col">
                        <button
                            className="btn btn-secondary mt-2 rounded-0 border border-light"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        ><IoMdArrowDropleft className="me-1"/>
                            Previous
                        </button>
                        </div>


                        <div className="col">
                        <button 
                            className="btn btn-secondary mt-2 float-end me-5 rounded-0 border border-light"
                            onClick={handleNext}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next <IoMdArrowDropright />
                        </button>
                        </div>
                        </div>

                        <div className="row border border-1 border-dark border p-3 mb-5">
                            <div className="col">
                            <button className="btn btn-secondary float-end  rounded-0 border border-light position-relative end-10" style={{width:"15%"}}
                            onClick={handleSubmit}>
                                Submit Quiz
                            </button>
                            </div>

                        </div>

                        <br /><br /><br />

                        <div className="row border bg-light mb-4">
                            <div className="col-auto mt-3 ms-1"><GrEdit /></div>
                            <div className="col-auto mt-3">
                                <p
                                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor/Details`)}
                                >
                                    Keep editing this quiz
                                </p>
                            </div>
                        </div>
                        
                    </>
                )}

                    <div className="row">
                            <div className="row"><h3>Questions</h3></div>

                            {questions.map((q:any, index:number)=>(
                                <div
                                className="row text-danger ms-4"
                                key={index}
                                style={{ cursor: "pointer" }}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                    <div className="col-auto"><FaRegQuestionCircle /></div>
                                    <div className="col-auto">Question {`${index+1}`}</div>
                                </div>
                            ))}

                        </div>

             </>

             

))}
        </div>
    );
}   