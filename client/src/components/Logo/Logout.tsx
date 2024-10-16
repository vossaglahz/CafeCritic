import { IUserState, logout } from "@/features/usersSlice";
import logoutIcon from "../../assets/images/logout.png"
import "./Logout.css";
import { useAppDispatch } from "@/store/hook";

export function LogoutIcon({user}: {user: IUserState | null}) {
    const dispatch = useAppDispatch()
    return (
        <div className="LogoutIcon" onClick={() => dispatch(logout(user?.id))}>
            <img src={logoutIcon} alt="logout-icon" />
        </div>
    );
};