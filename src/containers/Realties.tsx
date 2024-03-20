import { FC, useState } from 'react';

import RealtyForm from '../components/RealtyForm/RealtyForm';
import { Modal } from '../components/Modal/Modal';
import RealtyList from '../components/RealtyList/RealtyList';
import { Realty } from '~/src/models/Realty';
import { useModal } from '~/src/hooks/useModal';

interface RealtiesPropsType {
    realties: Realty[];
}

const Realties: FC<RealtiesPropsType> = ({
    realties,
}) => {
    const [realtyOnEdit, setRealtyOnEdit] = useState();

    const {
        openModal: openRealtyForm,
        isOpen: isOpenRealtyForm,
        closeModal: closeRealtyForm,
    } = useModal();

    const handleOpenRealtyForm = (realty) => {
        if (realty) {
            setRealtyOnEdit(realty);
            openRealtyForm();

            return;
        }

        setRealtyOnEdit(null);
        openRealtyForm();

        return;
    }

    return (
        <>
            <RealtyList
                realties={realties}
                onOpenRealtyForm={handleOpenRealtyForm}
                withCreateControl
            />

            <Modal
                isOpen={isOpenRealtyForm}
                onClose={closeRealtyForm}
            >
                <RealtyForm
                    initialRealty={realtyOnEdit}
                    onSubmit={closeRealtyForm}
                />
            </Modal>
        </>
    );
}

export default Realties;
