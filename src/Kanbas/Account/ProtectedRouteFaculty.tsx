import { useSelector } from "react-redux"

const ProtectedRouteFaculty = ({ children }: {
    children: any
}) => {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    if (currentUser?.role === "FACULTY") {
        return children;
    } else {
        return null;
    }
}

export default ProtectedRouteFaculty;
