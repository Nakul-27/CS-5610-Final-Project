import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import AssignmentEditor from "./Courses/Assignments/Editor";

import "./styles.css";
export default function Kanbas() {
    return (
        <div id="wd-kanbas">
            <KanbasNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Courses/:cid/*" element={<Courses />} />
                    <Route path="/Courses/:cid/Assignments/:aid" element={<AssignmentEditor />} />
                    <Route path="/Calendar/*" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox/*" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}
