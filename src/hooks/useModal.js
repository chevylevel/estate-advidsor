import { useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpenModal = () => {
        setIsOpen(true);
    }

    const handleClickCloseModal = () => {
        setIsOpen(false);
    }

    return {
        isOpen,
        handleClickOpenModal,
        handleClickCloseModal,
    }
}
