import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import ProtectedRouteFaculty from "../../Account/ProtectedRouteFaculty";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
}) {
    return (
        <div className="float-end">
            <ProtectedRouteFaculty>
                <FaPencil onClick={() => editModule(moduleId)}
                    className="text-primary me-3" />
                <FaTrash className="text-danger me-2 mb-1"
                    onClick={() => deleteModule(moduleId)} />
            </ProtectedRouteFaculty>
            <GreenCheckmark />
            <FaPlus style={{ marginLeft: "4px", marginRight: "-4px" }} className="fs-5" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
