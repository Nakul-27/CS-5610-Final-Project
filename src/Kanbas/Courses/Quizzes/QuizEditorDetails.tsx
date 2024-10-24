import { useParams } from "react-router";
import * as db from "../../Database";
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

export default function QuizEditorDetails() {
    const {cid, qid} = useParams()
    const quizzes = db.quizzes;
    const [value, setValue] = useState('');

    return (
        <div className="container-fluid">
        <div id="wd-quiz-editor-details" className="p-2 row">
            {quizzes 
        .filter((quiz: any) => quiz.course==cid)
        .filter((quiz: any) => quiz._id ==qid)
        .map((quiz: any) => (
          <>  
            <div className="row mb-4"><input id="wd-quiz-editor-title" value={`${quiz.title}`} type="text" className="form-control" style={{width:"70%"}} /></div>
            <div className="row mb-1"><p >Quiz Instructions:</p></div>
            <div className="row mb-5"><Editor value={value} onChange={(e)=>setValue(e.target.value)} /></div>

            <div className="row mb-2" style={{position:"relative",left:"-200px"}}>
            <div className="row mb-2">
                <div className="col" style={{textAlign:"right"}}>
                <label htmlFor="wd-quiz-editor-type" className="form-label">Quiz Type</label>
                </div>
                <div className="col">
                <select id="wd-quiz-editor-type" className="form-select">
                  <option selected>Graded Quiz</option>
                  <option>Practice Quiz</option>
                  <option>Graded Survey</option>
                  <option>Ungraded Survey</option>
                </select>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col" style={{textAlign:"right"}}>
                <label htmlFor="wd-quiz-editor-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col">
                <select id="wd-quiz-editor-group" className="form-select">
                    <option selected>QUIZZES</option>
                    <option>EXAMS</option>
                    <option>ASSIGNMENTS</option>
                    <option>PROJECTS</option>
                </select>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col" style={{textAlign:"right"}}>
                <label className="form-label"></label>
                </div>

                <div className="col">
                    <ul className="list-group rounded-0 border-0">
                        <li className="list-group-item border-0">
                            <div className="row"><label className="form-label" style={{fontWeight:"bold"}}>Options</label></div>
                        </li>

                        <li className="list-group-item border-0">                          
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-shuffle" id="wd-quiz-editor-shuffle" className="form-check-input me-2" defaultChecked/>
                            <label htmlFor="wd-quiz-editor-shuffle">Shuffle Answers</label></div>
                        </li>

                        <li className="list-group-item border-0">  
                            <div className="row">                      
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-timelimit" id="wd-quiz-editor-timelimit" className="form-check-input me-2"/>
                            <label htmlFor="wd-quiz-editor-timelimit">Time Limit</label></div>
                            <div className="col"><input type="text" name="wd-quiz-editor-timelimit" id="wd-quiz-editor-timelimit" style={{width:"20%"}}/>
                            <label htmlFor="wd-quiz-editor-timelimit" className="ms-1">Minutes</label></div>
                            </div>  
                        </li>

                        <li className="list-group-item border-0">                          
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-attempts" id="wd-quiz-editor-attempts" className="form-check-input me-2"/>
                            <label htmlFor="wd-quiz-editor-attempts">Allow Multiple Attempts</label></div>
                        </li>

                        <li className="list-group-item border-0">  
                            <div className="row">                      
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-show" id="wd-quiz-editor-show" className="form-check-input me-2"/>
                            <label htmlFor="wd-quiz-editor-show">Show Correct Answers</label></div>
                            <div className="input-group"><input type="datetime" name="wd-quiz-editor-show" id="wd-quiz-editor-show" className="form-control"/><span className="input-group-text"><MdDateRange /></span></div>
                            </div>  
                        </li>

                        <li className="list-group-item border-0">     
                            <div className="row">
                            <div className="col">                    
                            <label htmlFor="wd-quiz-editor-code">Access Code</label></div>
                            <div className="col"><input type="text" name="wd-quiz-editor-code" id="wd-quiz-editor-code"/></div>
                            </div> 
                        </li>

                        <li className="list-group-item border-0">                          
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-order" id="wd-quiz-editor-order" className="form-check-input me-2" defaultChecked/>
                            <label htmlFor="wd-quiz-editor-order">One Question at a Time</label></div>
                        </li>

                        <li className="list-group-item border-0">                          
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-webcam" id="wd-quiz-editor-webcam" className="form-check-input me-2"/>
                            <label htmlFor="wd-quiz-editor-webcam">Webcam Required</label></div>
                        </li>

                        <li className="list-group-item border-0">                          
                            <div className="col"><input type="checkbox" name="wd-quiz-editor-lock" id="wd-quiz-editor-lock" className="form-check-input me-2"/>
                            <label htmlFor="wd-quiz-editor-lock">Lock Questions After Answering</label></div>
                        </li>
                    </ul>
                </div>
              </div>
              
            <div className="row mb-2">
                <div className="col"style={{textAlign:"right"}}>
                  <label htmlFor="wd-assign-to" className="form-label">Assign</label>
                  </div>

                  <div className="col">
                      <ul className="list-group rounded-0 border">

                        <li className="list-group-item border-0">
                          <div className="row"><label htmlFor="wd-assign-to" className="form-label" style={{fontWeight:"bold"}}>Assign to</label></div>
                          <div className="row"><input type="text" name="wd-assign-to" id="wd-assign-to" className="form-control me-2"/></div>
                          </li>


                      <li className="list-group-item border-0">
                          <div className="row"><label htmlFor="wd-due-date" className="wd-due-date" style={{fontWeight:"bold"}}>Due</label></div>
                          <div className="row"><div className="input-group"><input type="datetime" name="wd-due-date" id="wd-due-date" className="form-control" value={`${quiz.due_date}`}/><span className="input-group-text"><MdDateRange /></span></div></div>
                          </li>

                      <li className="list-group-item border-0">
                        <div className="row">
                        <div className="col">
                          <div className="row"><label htmlFor="wd-available-from" className="wd-available-from" style={{fontWeight:"bold"}}>Available From</label></div>
                          <div className="row"><div className="input-group"><input type="datetime" name="wd-available-from" id="wd-available-from" className="form-control" value={`${quiz.available_from}`}/><span className="input-group-text"><MdDateRange /></span></div></div>
                          </div>

                          <div className="col">
                          <div className="row"><label htmlFor="wd-available-until" className="wd-available-until" style={{fontWeight:"bold"}}>Until</label></div>
                          <div className="row"><div className="input-group"><input type="datetime" name="wd-available-until" id="wd-available-until" className="form-control" value={`${quiz.available_until}`}/><span className="input-group-text"><MdDateRange /></span></div></div>
                          </div>
                          </div>
                          </li>
                      </ul>
                  </div>


              </div>
              </div>
        
        </>))}


        <hr />
        <div className="row mt-2 mb-4">
            <div className="col d-flex justify-content-center">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                    <button className="btn btn-secondary rounded-1 me-2" type="submit">Cancel</button>
                </Link>
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                    <button className="btn btn-danger rounded-1" type="submit">Save</button>
                </Link>
            </div>
        </div>

        <hr />

        </div>
        </div>
    );

}