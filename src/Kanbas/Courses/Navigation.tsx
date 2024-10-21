import { NavLink, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation"
      className="wd list-group fs-5 pe-2 rounded-0"
    >
      {links.map((link) => (
        <NavLink to={`/Kanbas/Courses/${cid}/${link}`}
          id="wd-course-home-link"
          className={({ isActive }) =>
            isActive
              ? "list-group-item active border border-0"
              : "list-group-item text-danger border border-0"
          }
        >
          {link}
        </NavLink>
      ))}
    </div>
  );
}
