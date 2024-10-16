import "./Backdrop.css";

type TProps = {
    show: boolean;
    onClosed: VoidFunction
}

export const Backdrop = ({show, onClosed}: TProps) => {
    return (
        <div 
            onClick={onClosed} 
            className="Backdrop" 
            style={{display: show ? "block" : "none"}}
        >    
        </div>
    )
};