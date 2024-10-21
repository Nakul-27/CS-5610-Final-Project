import { LiaPaperPlane } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import * as db from "./Database";

export default function Dashboard() {
    const courses = db.courses;
    console.log(courses);
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                            <div className="card rounded-3 overflow-hidden">
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
                                    <NavLink to="#/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/TDD.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        CS2345 TDD
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Test Driven Development
                                    </p>
                                </div>
                                <NavLink to="#/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/webdev.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        CS3456 Web Development
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Web Development
                                    </p>
                                </div>
                                <NavLink to="#/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/AI.jpeg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        CS4567 Artificial Intelligence
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Artificial Intelligence
                                    </p>
                                </div>
                                <NavLink to="#/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/deeplearning.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        CS5678 Deep Learning
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Deep Learning
                                    </p>
                                </div>
                                <NavLink to="/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/musictheory.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        MU6789 Music Theory
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Music Theory
                                    </p>
                                </div>
                                <NavLink to="/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/LLM.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        CS7890 Large Language Models
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Large Language Models
                                    </p>
                                </div>
                                <NavLink to="/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to="/Kanbas/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoartion-none text-dark">
                                <img src="/images/timemanagement.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title d-block text-truncate">
                                        CS8901 Project Time Management
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Project Time Management
                                    </p>
                                </div>
                                <NavLink to="/Kanbas/Courses/1234/Home" className="bg-white"> <LiaPaperPlane size={30} /></NavLink>
                            </Link>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div >
    );
}
