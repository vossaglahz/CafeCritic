import { Link } from "react-router-dom";
import { Logo } from "../../Logo/Logo";
import { NavigationItems } from "../NavigationItems";
import { LogoutIcon } from "@/components/Logo/Logout";
import { useAppSelector } from "@/store/hook";
import "./ToolBar.css";
import { LoginIcon } from "@/components/Logo/Login";

export const Toolbar = () => {
    const { user } = useAppSelector(state => state.users);
    const tokenInLocalStorage = localStorage.getItem("token");

    const isUserAuthenticated = user?.token !== null && user && tokenInLocalStorage;

    return (
        <header className="ToolBar">
            <Link to={"/"} className="Toolbar-logo">
                <Logo />
            </Link>
            <nav className="nav-main">
                {isUserAuthenticated && <NavigationItems />}
                {isUserAuthenticated && (
                    <>
                        <img
                            className="user-image"
                            src={`http://localhost:8000/uploads/${user.image}`}
                            alt="user-image"
                        />
                        <p className="username-nick">
                            {user.role}: {user.displayName}
                        </p>
                    </>
                )}
                {isUserAuthenticated && <LogoutIcon user={user} />}
            </nav>
            <Link to={"/auth"} className="Toolbar-logo">
                {!isUserAuthenticated && <LoginIcon />}
            </Link>
        </header>
    );
};
