import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
    return (
        <span className="me-1 position-relative">
            <FaCheckCircle className="text-success position-absolute top-50 start-50 translate-middle fs-6" />
            <FaCircle className="text-white me-1 fs-6" />
        </span>
    );
}
