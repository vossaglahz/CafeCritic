import homeIcon from "../../assets/images/home.png"
import "./HomeIcon.css";

export const HomeIcon = () => {
    return (
        <div className="HomeIcon">
            <img src={homeIcon} alt="home-icon" />
        </div>
    );
};