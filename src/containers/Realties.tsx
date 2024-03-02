import { FC, useState } from 'react';
import RealtyForm from '../components/RealtyForm/RealtyForm';
import { Modal } from '../components/Modal/Modal';
import RealtyList from '../components/RealtyList/RealtyList';
import { Realty } from '~/src/models/Realty';
import { useModal } from '~/src/hooks/useModal';
import { useLocations } from '../hooks/useLocations';

interface RealtiesPropsType {
    realties: Realty[];
    locations: {
        _id: string,
        name: string
    }[];
}

const Realties: FC<RealtiesPropsType> = ({
    realties,
    locations,
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
            />

            <Modal
                    isOpen={isOpenRealtyForm}
                    onClose={closeRealtyForm}
            >
                <RealtyForm
                    initialRealty={realtyOnEdit}
                    onSubmit={closeRealtyForm}
                    locations={locations}
                />
            </Modal>
        </>
    );
}

export default Realties;
