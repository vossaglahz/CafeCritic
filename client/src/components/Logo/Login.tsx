import loginIcon from "../../assets/images/login.png"
import "./Login.css";

export const LoginIcon = () => {
    return (
        <div className="LoginIcon">
            <img src={loginIcon} alt="login-icon" />
        </div>
    );
};