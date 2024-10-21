import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
export default function AssignmentsControlButtons() {
    return (
        <div className="float-end d-flex align-items-center">
            <span className="badge bg-light text-dark rounded-pill me-2">
                40% of Total
            </span>
            <FaPlus className="fs-5 me-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
