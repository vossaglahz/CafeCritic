import statusIcon from "../../assets/images/loading.png"
import "./Status.css";

export const StatusIcon = () => {
    return (
        <div className="StatusIcon">
            <img src={statusIcon} alt="status-icon" />
        </div>
    );
};