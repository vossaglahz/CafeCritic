import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

type TProps = {
    to: string,
    end: boolean,
    children: ReactNode
}

export const NavigationItem = ({to, end, children}: TProps) => {
    return (
        <li className="NavigationItem">
            <NavLink to={to} end={end}>
                {children}
            </NavLink>
        </li>
    )
};