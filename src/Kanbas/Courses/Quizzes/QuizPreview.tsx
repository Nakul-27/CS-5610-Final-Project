import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { CgDanger } from "react-icons/cg";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function QuizPreview() {
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { cid, qid } = useParams()
    const quiz = quizzes.find((quiz: any) => quiz.course == cid && quiz._id == qid);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
                     <div className="row mt-3">

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
                                                    <input type="checkbox" className="me-3" id={`wd-answer-${index}`}/>
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
                                                <input type="text" name="FillInBlank" className="ms-4" style={{width:"10%"}}/>
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
                            <button className="btn btn-secondary float-end  rounded-0 border border-light position-relative end-10" style={{width:"15%"}}>
                                Submit Quiz
                            </button>
                            </div>

                        </div>

                        <br /><br /><br />

                        <div className="row border bg-light mb-4">
                          <div className="col-auto mt-3 ms-1"><GrEdit /> </div><div className="col-auto mt-3"><p>Keep editing this quiz</p></div>
                        </div>
                        
                    </>
                )}

                    <div className="row">
                            <div className="row"><h3>Questions</h3></div>

                            {questions.map((q:any, index:number)=>(
                                <div className="row text-danger ms-4" key={index}>
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