import { Link, useNavigate } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchProfile = () => {
        if (!currentUser) {
            return navigate("/Kanbas/Account/Signin");
        }
        setProfile(currentUser);
    }
    const signout = () => {
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    }
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            {profile && (
                <div>
                    <input
                        value={profile.username}
                        placeholder="Username"
                        id="wd-username"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <input value={profile.password}
                        placeholder="Password"
                        id="wd-password"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <input value={profile.firstName}
                        placeholder="First Name"
                        id="wd-firstname"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <input value={profile.lastName}
                        placeholder="Last Name"
                        id="wd-lastname"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <div className="form-control input-group mb-2">
                        <input
                            defaultValue={profile.dob}
                            type="date"
                            className="form-control border-0"
                            id="wd-dob"
                            pattern="\d{2}/\d{2}/\d{4}"
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                        <span className="border-0 mt-1">
                            <CiCalendar size={20} />
                        </span>
                    </div>
                    <input defaultValue={profile.email}
                        type="email"
                        id="wd-email"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <select defaultValue={profile.role}
                        id="wd-role"
                        className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={signout}
                        className="btn btn-danger w-100 mb-2"
                        id="wd-signout-btn">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}

