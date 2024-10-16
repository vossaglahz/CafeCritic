import { ReactNode } from "react";
import "./Modal.css";
import { Backdrop } from "../Backdrop/Backdrop";

type TProps = {
    children: ReactNode;
    show: boolean;
    onClosed: VoidFunction
}

export const Modal = ({children, show, onClosed}: TProps) => {
    return (
        <>
            <Backdrop show={show} onClosed={onClosed}/>
            <div 
                className={"Modal"} 
                style={{transform: show ? "translateY(0)" : "translateY(-100vh)"}}
            >
                {children}
            </div>
        </>
    )
};
