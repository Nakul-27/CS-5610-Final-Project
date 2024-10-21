import { CiCalendar } from "react-icons/ci";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignments = db.assignments;

    return (
        <div id="wd-assignments-editor">
            {assignments
                .filter((assignment: any) => assignment._id === aid)
                .map((assignment: any) => (
                    <div className="mb-3">
                        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                        <div>
                            <input id="wd-name"
                                className="form-control"
                                value={`${assignment.title}`} />
                        </div>
                        <div
                            id="wd-description"
                            className="form-control"
                        >
                            The assignment is
                            <span className="text-danger"> available online</span>.
                            <p> </p>
                            Submit a link to the landing page of your Web application running on Netlify.
                            <p> </p>
                            The landing page should include the following:
                            <ul>
                                <li>
                                    Your full name and section
                                </li>
                                <li>
                                    Links to each of the lab assignments
                                </li>
                                <li>
                                    Link to the Kanbas application
                                </li>
                                <li>
                                    Links to all relevant source code repositories
                                </li>
                            </ul>
                            The Kanbas application should include a link to navigate back to the landing page.
                        </div>
                        <br />
                        <div className="container">
                            <div className="row mb-3 align-items-start">
                                <label htmlFor="wd-points" className="form-label col-sm-3 text-end">Points</label>
                                <div className="col-sm-9">
                                    <input id="wd-points" className="form-control" value={100} />
                                </div>
                            </div>

                            <div className="row mb-3 align-items-start">
                                <label htmlFor="wd-group" className="form-label col-sm-3 text-end">Assignment Group</label>
                                <div className="col-sm-9">
                                    <select id="wd-group" className="form-select">
                                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3 align-items-start">
                                <label htmlFor="wd-display-grade-as" className="form-label col-sm-3 text-end">Display Grade as</label>
                                <div className="col-sm-9">
                                    <select id="wd-display-grade-as" className="form-select">
                                        <option value="Percentage">Percentage</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3 align-items-start">
                                <label htmlFor="wd-submission-type" className="form-label col-sm-3 text-end">Submission Type</label>
                                <div className="col-sm-9">
                                    <div className="form-control">
                                        <select id="wd-submission-type" className="form-select">
                                            <option value="Online">Online</option>
                                        </select>
                                        <div className="mt-2">
                                            <strong>Online Entry Options</strong>
                                            <div>
                                                <input type="checkbox" name="check-entry" id="wd-text-entry" className="me-2" />
                                                <label htmlFor="wd-text-entry" className="form-label">Text Entry</label><br />
                                                <input type="checkbox" name="check-entry" id="wd-website-url" className="me-2" />
                                                <label htmlFor="wd-website-url" className="form-label">Website URL</label><br />
                                                <input type="checkbox" name="check-entry" id="wd-media-recordings" className="me-2" />
                                                <label htmlFor="wd-media-recordings" className="form-label">Media Recordings</label><br />
                                                <input type="checkbox" name="check-entry" id="wd-student-annotation" className="me-2" />
                                                <label htmlFor="wd-student-annotation" className="form-label">Student Annotations</label><br />
                                                <input type="checkbox" name="check-entry" id="wd-file-upload" className="me-2" />
                                                <label htmlFor="wd-file-upload" className="form-label">File Uploads</label><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3 align-items-start">
                                <label htmlFor="wd-assign-to" className="form-label col-sm-3 text-end">Assign</label>
                                <div className="col-sm-9">
                                    <strong>Assign To</strong><br />
                                    <input id="wd-assign-to" className="form-control" /><br />
                                    <strong>Due</strong><br />
                                    <div className="form-control input-group mb-2">
                                        <input
                                            defaultValue="2024-05-13"
                                            type="date"
                                            className="form-control border-0"
                                            id="wd-dob"
                                            pattern="\d{2}/\d{2}/\d{4}" />
                                        <span className="border-0 mt-1">
                                            <CiCalendar size={20} />
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="wd-available-from" className="form-label">Available from</label>
                                            <div className="form-control input-group mb-2">
                                                <input
                                                    defaultValue="2024-05-06"
                                                    type="date"
                                                    className="form-control border-0"
                                                    id="wd-dob"
                                                    pattern="\d{2}/\d{2}/\d{4}" />
                                                <span className="border-0 mt-1">
                                                    <CiCalendar size={20} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="wd-available-from" className="form-label">Until</label>
                                            <div className="form-control input-group mb-2">
                                                <input
                                                    defaultValue="2024-05-13"
                                                    type="date"
                                                    className="form-control border-0"
                                                    id="wd-dob"
                                                    pattern="\d{2}/\d{2}/\d{4}" />
                                                <span className="border-0 mt-1">
                                                    <CiCalendar size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="text-end">
                                <Link to={`/Kanbas/Courses/${cid}/Assignments`}
                                    className="btn btn-md btn-secondary me-2"
                                >
                                    Cancel
                                </Link>
                                <Link to={`/Kanbas/Courses/${cid}/Assignments`}
                                    className="btn btn-md btn-danger"
                                >
                                    Save
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
