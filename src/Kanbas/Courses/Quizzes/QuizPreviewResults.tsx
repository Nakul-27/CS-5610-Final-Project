import { useEffect } from "react";
import { useLocation } from "react-router";
import { FaArrowRight } from "react-icons/fa";

export default function QuizPreviewResults() {
    const location = useLocation();
    const { userAnswers, questions, quizTitle } = location.state || {};

    const totalPoints = questions.reduce((acc: number, question: any) => acc + parseFloat(question.points || "0"), 0);
    const userScore = questions.reduce((acc: number, question: any) => {
        return acc + (userAnswers[question._id] === question.correct_answer ? parseFloat(question.points || "0") : 0);
    }, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const renderResult = (question: any, userAnswer: any) => {
        switch (question.type) {
            case "Multiple Choice":
                return (
                    <div className="list-group rounded-0 border-0">
                        <li className="list-group-item border-0">
                            <div className="row">
                                {question.answers.map((answer: any, index: number) => (
                                    <>
                                        <hr className="ms-4" style={{ width: "95%" }} />
                                        <div key={index} className="row ms-5">
                                            <div className="col-auto">
                                                <input
                                                    type="checkbox"
                                                    className="me-3"
                                                    disabled
                                                    checked={answer === userAnswer || answer === question.correct_answer}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <label className="form-label">{answer}</label>
                                            </div>
                                            <div className="col-auto">
                                                {answer === userAnswer && answer === question.correct_answer && (
                                                    <div className="d-inline-block text-success" style={{ fontWeight: "bold" }}>
                                                        <FaArrowRight /> Correct!
                                                    </div>
                                                )}
                                                {answer === userAnswer && answer !== question.correct_answer && (
                                                    <div className="d-inline-block text-danger" style={{ fontWeight: "bold" }}>
                                                        <FaArrowRight /> You Answered
                                                    </div>
                                                )}
                                                {answer === question.correct_answer && answer !== userAnswer && (
                                                    <div className="d-inline-block text-secondary" style={{ fontWeight: "bold" }}>
                                                        <FaArrowRight /> Correct Answer
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </li>
                    </div>
                );

            case "True or False":
                return (
                    <div className="list-group rounded-0 border-0">
                        <li className="list-group-item border-0">
                            <div className="row">
                                {["True", "False"].map((answer, index) => (
                                    <>
                                        <hr className="ms-4" style={{ width: "95%" }} />
                                        <div key={index} className="row ms-5">
                                            <div className="col-auto">
                                                <input
                                                    type="radio"
                                                    name={`trueFalse-${question._id}`}
                                                    className="me-3"
                                                    disabled
                                                    checked={answer === userAnswer || answer === question.correct_answer}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <label className="form-label">{answer}</label>
                                            </div>
                                            <div className="col-auto">
                                                {answer === userAnswer && answer === question.correct_answer && (
                                                    <div className="d-inline-block text-success" style={{ fontWeight: "bold" }}>
                                                        <FaArrowRight /> Correct!
                                                    </div>
                                                )}
                                                {answer === userAnswer && answer !== question.correct_answer && (
                                                    <div className="d-inline-block text-danger" style={{ fontWeight: "bold" }}>
                                                        <FaArrowRight /> You Answered
                                                    </div>
                                                )}
                                                {answer === question.correct_answer && answer !== userAnswer && (
                                                    <div className="d-inline-block text-secondary" style={{ fontWeight: "bold" }}>
                                                        <FaArrowRight /> Correct Answer
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </li>
                    </div>
                );

            case "Fill in the Blank":
                return (
                    <div className="list-group rounded-0 border-0">
                        <li className="list-group-item border-0">
                            <div className="row ms-5">
                                <div className="col-12 mb-3">
                                    <p>
                                        <strong>Your Answer:</strong> {userAnswer}
                                    </p>
                                    {question.correct_answer === userAnswer ? (
                                        <div className="d-inline-block text-success" style={{ fontWeight: "bold" }}>
                                            <FaArrowRight /> Correct!
                                        </div>
                                    ) : (
                                        <>
                                            <div className="d-inline-block text-danger" style={{ fontWeight: "bold" }}>
                                                <FaArrowRight /> You Answered: {userAnswer}
                                            </div>
                                            <div className="d-inline-block text-secondary ms-4" style={{ fontWeight: "bold" }}>
                                                <FaArrowRight /> Correct Answer: {question.correct_answer}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="container-fluid" id="wd-quiz-preview-results">
            
            <div className="row mb-4">
                <div className="col">
                    <h2>{quizTitle}</h2>
                    <h4>
                        Score: {userScore} / {totalPoints}
                    </h4>
                </div>
            </div>

            {questions.map((question: any, index: number) => (
                <div className="row mb-4" key={index}>
                    <div className="col">
                        <div className="card border-secondary mb-3">
                            <div className="card-header d-flex justify-content-between">
                                <span>{question.title}</span>
                                <span>
                                    {userAnswers[question._id] === question.correct_answer
                                        ? `${question.points} / ${question.points} pts`
                                        : `0 / ${question.points} pts`}
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{question.description}</p>
                                {renderResult(question, userAnswers[question._id])}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


