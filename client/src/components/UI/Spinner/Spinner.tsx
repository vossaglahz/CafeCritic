import { Backdrop } from "../Backdrop/Backdrop";
import './Spinner.css';

type TProps = {
    show: boolean
}

export const Spinner = ({show}: TProps) => {
    return (
        show ?
        <div className="Spinner-block">
            <Backdrop show={show} onClosed={() => {}}/>
            <span className="Spinner"></span>
        </div> : null
    )
};