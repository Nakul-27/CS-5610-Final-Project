import { IoHomeSharp } from "react-icons/io5";
import { LiaFileImportSolid } from "react-icons/lia";
import { RiBarChart2Fill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
export default function CourseStatus() {
    return (
        <div id="wd-course-status" className="ps-5">
            <h2>Course Status</h2>
            <div className="d-flex align-items-center text-nowrap">
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 text-center" >
                    <MdDoNotDisturbAlt className=" me-2 fs-5" size={20} />
                    Unpublish
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-success me-1 text-center" >
                    <FaCheckCircle size={20} className="me-2 fs-5" />
                    Publish
                </button>
            </div>
            <br />
            <div className="d-flex flex-column">
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <BiImport size={20} className="position-relative me-1" />
                    Import Existing Content
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <LiaFileImportSolid size={20} className="position-relative me-1" />
                    Import from Commons
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <IoHomeSharp size={20} className="position-relative me-1" />
                    Choose Home Page
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <RiBarChart2Fill size={20} className="position-relative me-1" />
                    View Course Screen
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <TfiAnnouncement size={20} className="position-relative me-1" />
                    New Announcement
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <RiBarChart2Fill size={20} className="position-relative me-1" />
                    New Analytics
                </button>
                <button id="wd-view-progress"
                    className="btn btn-lg btn-secondary me-1 mb-2 text-start text-nowrap" >
                    <FaBell size={20} className="position-relative me-1" />
                    View Course Notirications
                </button>
            </div>
        </div>
    );
}
