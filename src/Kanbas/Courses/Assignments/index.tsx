import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div>
      <div id="wd-assignments">
        <AssignmentsControls /><br /><br />
        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-assignments-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-1 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-5" />
              ASSIGNMENTS
              <AssignmentsControlButtons />
            </div>
            <ul className="wd-assignments list-group rounded-0">
              {assignments
                .filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (
                  <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdOutlineAssignment className="me-3 fs-3 text-success" />
                      <div className={`wd-${assignment._id}`}>
                        <a className="wd-assignment-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                          {assignment.title}
                        </a>
                        <br />
                        <span className="text-danger me-1">
                          Multiple Modules
                        </span>
                        | <strong>Not available until</strong> May 6 at 12:00am |
                        <span className="ms-1">
                          <strong>Due</strong> May 13 at 11:59pm | 100pts
                        </span>
                      </div>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                      <AssignmentControlButtons />
                    </div>
                  </li>
                ))
              }
            </ul>
          </li >
        </ul>
      </div>
    </div>

  );
}
