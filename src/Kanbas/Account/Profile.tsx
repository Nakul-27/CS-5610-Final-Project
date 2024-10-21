import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            <input
                defaultValue="alice"
                placeholder="username"
                id="wd-username"
                className="form-control mb-2" />
            <input defaultValue="123"
                placeholder="password"
                id="wd-password"
                className="form-control mb-2" />
            <input defaultValue="Alice"
                placeholder="First Name"
                id="wd-firstname"
                className="form-control mb-2" />
            <input defaultValue="Wonderland"
                placeholder="Last Name"
                id="wd-lastname"
                className="form-control mb-2" />
            <div className="form-control input-group mb-2">
                <input
                    defaultValue=""
                    type="date"
                    className="form-control border-0"
                    id="wd-dob"
                    pattern="\d{2}/\d{2}/\d{4}" />
                <span className="border-0 mt-1">
                    <CiCalendar size={20} />
                </span>
            </div>
            <input defaultValue="alice@wonderland.com"
                type="email"
                id="wd-email"
                className="form-control mb-2" />
            <select defaultValue="USER"
                id="wd-role"
                className="form-control mb-2">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>
            <Link to="/Kanbas/Account/Signin"
                className="btn btn-danger w-100">
                Sign out</Link>
        </div>
    );
}

