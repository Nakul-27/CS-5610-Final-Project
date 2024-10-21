import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <FaPlus style={{ marginLeft: "4px", marginRight: "-4px" }} className="fs-5" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
