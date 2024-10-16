import logo from "../../assets/images/cafe.png"
import "./Logo.css";

export const Logo = () => {
    return (
        <div className="Logo">
            <img src={logo} alt="logo" />
        </div>
    );
};