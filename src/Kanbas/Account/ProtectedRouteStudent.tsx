import { useSelector } from "react-redux"

const ProtectedRouteStudent = ({ children }: {
    children: any
}) => {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    if (currentUser?.role === "STUDENT" || currentUser?.role === "TA" ) {
        return children;
    } else {
        return null;
    }
}

export default ProtectedRouteStudent;
