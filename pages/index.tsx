import { observer } from 'mobx-react-lite';

import { Modal } from '../src/components/Modal/Modal';
import { WhatsappForm } from '../src/components/WhatsappForm/WhatsappForm';
import { useModal } from '../src/hooks/useModal';
import { useFilters } from '../src/hooks/useFilters';
import Page from '../src/components/Page/Page';
import Search from '../src/components/Search/Search';
import FiltersLayout from '../src/components/FiltersLayout/FiltersLayout';
import Filters from '../src/containers/Filters/Filters';
import Realties from '../src/containers/Realties';
import { NextPage } from 'next';
import { Realty } from '~/src/models/Realty';
import { useContext } from 'react';
import ContextProvider, { Context } from '~/src/app/Context';
import { API_URL } from '~/config';

const MainPage: NextPage = () => {
    const { store } = useContext(Context);

    const {
        openModal: openWatsappForm,
        isOpen: isOpenWatsappFrom,
        closeModal: closeWatsappForm,
    } = useModal();

    const {
        filteredRealties = [],
        setFilters,
    } = useFilters([...store.realties]);

    return (
        <Page>
            <Search />

            <FiltersLayout>
                <Filters onSetFilters={setFilters} />
            </FiltersLayout>

            <Realties realties={filteredRealties} />

            <Modal
                isOpen={isOpenWatsappFrom}
                onClose={closeWatsappForm}
            >
                <WhatsappForm onClose={closeWatsappForm} />
            </Modal>
        </Page>
    );
}

export default observer(MainPage);
