import modal from './Modal.module.css';
import { RemoveScroll } from 'react-remove-scroll';

export const Modal = ({
    isOpen,
    onClose,
    children,
}) => {
    return isOpen
        ? (
            <RemoveScroll>
                 <div className={modal.substrate}>
                    <div className={modal.wrapper}>
                        <div className={modal.content}>
                            <div className={modal.closeButton}>
                                <button onClick={onClose}>&times;</button>
                            </div>

                            { children }
                        </div>
                    </div>
                </div>
            </RemoveScroll>
        )
        : null;
}
