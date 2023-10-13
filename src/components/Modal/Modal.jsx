import modal from './Modal.module.css';

export const Modal = ({
    isOpen,
    onClose,
    children,
}) => {
    return (
        <div className={isOpen ? modal.open : modal.Modal}>
            <div className={modal.content}>
                <div className={modal.closeButton}>
                    <button onClick={onClose}>&times;</button>
                </div>
                { children }
            </div>
        </div>
    );
}
