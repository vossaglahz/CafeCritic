import { NavigationItem } from "./NavigationItem";
import "./Navigation.css";
import { HomeIcon } from "../Logo/HomeIcon";
import { AddIcon } from "../Logo/AddIcon";
import { StatusIcon } from "../Logo/Status";
import { ModerateIcon } from "../Logo/Moderate";
import { useAppSelector } from "@/store/hook";
import { UserRoles } from "@/features/usersSlice";

export const NavigationItems = () => {
    const { user } = useAppSelector(state => state.users);
    return (
        <ul className="NavigationItems">
            <NavigationItem to="/" end>
                <HomeIcon/>
            </NavigationItem>
            <NavigationItem to="/add" end>
                <AddIcon/>
            </NavigationItem>
            <NavigationItem to="/status" end>
                <StatusIcon/>
            </NavigationItem>
            {
                user?.role === UserRoles.admin &&
                <NavigationItem to="/moderate" end>
                <ModerateIcon/>
            </NavigationItem>
            }
        </ul>
    )
};