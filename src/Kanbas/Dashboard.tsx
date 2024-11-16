import { useEffect, useState } from "react";
import { LiaPaperPlane } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ProtectedRouteFaculty from "./Account/ProtectedRouteFaculty";
import ProtectedRouteStudent from "./Account/ProtectedRouteStudent";
import * as db from "./Database";
import { enrollCourse, setEnrollments, unenrollCourse } from "./reducer";

export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void
}) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const enrollments = useSelector((state: any) => state.enrollmentReducer.enrollments);
    const dispatch = useDispatch();

    const [showCourses, setShowCourses] = useState(false);

    const fetchEnrollments = () => {
        const savedEnrollments = localStorage.getItem("enrollments");
        const parsedEnrollments = savedEnrollments ? JSON.parse(savedEnrollments) : [];
        dispatch(setEnrollments(parsedEnrollments));
    }

    useEffect(() => {
        fetchEnrollments();
    }, []);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <ProtectedRouteFaculty>
                <h5>
                    New Course
                    <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse}>
                        Add
                    </button>
                    <button className="btn btn-warning float-end me-2"
                        id="wd-update-course-click"
                        onClick={updateCourse}>
                        Update
                    </button>
                </h5>
                <br />
                <input value={course.name}
                    className="form-control mb-2"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <textarea value={course.description}
                    className="form-control"
                    onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                <hr />
            </ProtectedRouteFaculty>

            <ProtectedRouteStudent>
                <button className="btn btn-info float-end mb-3"
                    onClick={() => setShowCourses(!showCourses)}>
                    {showCourses ? "Hide Enrollments" : "Show Enrollments"}
                </button>
            </ProtectedRouteStudent>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {courses.filter((course) => {
                        if (currentUser.role === "FACULTY") {
                            return true;
                        } else if (currentUser.role === "STUDENT") {
                            return showCourses ||
                                enrollments.some(
                                    (enrollment: { user: string, course: string }) =>
                                        enrollment.user === currentUser._id &&
                                        enrollment.course === course._id
                                );
                        } else {
                            return false;
                        }
                    }).map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <div>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoartion-none text-dark">
                                        <img src={`${course.image}`} width="100%" height={160} />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title d-block text-truncate">
                                                {course.name}
                                            </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                                style={{ maxHeight: 100 }}
                                            >
                                                {course.description}
                                            </p>
                                        </div>
                                        <NavLink to={`#/Kanbas/Courses/${course._id}/Home`} className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                                    </Link>

                                    <ProtectedRouteFaculty>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}
                                            className="btn btn-danger me-2 float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </button>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}
                                            className="btn btn-warning me-2 float-end"
                                            id="wd-edit-course-click"
                                        >
                                            Edit
                                        </button>
                                    </ProtectedRouteFaculty>

                                    <ProtectedRouteStudent>
                                        {enrollments.some((enrollment: any) =>
                                            enrollment.user === currentUser._id &&
                                            enrollment.course === course._id) ? (
                                            <button className="btn btn-danger float-end"
                                                onClick={() => {
                                                    dispatch(unenrollCourse({
                                                        userId: currentUser._id, courseId: course._id
                                                    }));
                                                }}>
                                                Unenroll
                                            </button>
                                        ) : (
                                            <button className="btn btn-success float-end"
                                                onClick={() => {
                                                    dispatch(enrollCourse({
                                                        userId: currentUser._id, courseId: course._id
                                                    }))
                                                }}>
                                                Enroll
                                            </button>
                                        )}
                                    </ProtectedRouteStudent>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
