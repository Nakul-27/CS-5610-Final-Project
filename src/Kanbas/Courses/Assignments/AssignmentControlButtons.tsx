import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function AssignmentControlButtons() {
    return (
        <div className="d-flex align-items-center">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-6" />
        </div>
    );
}
