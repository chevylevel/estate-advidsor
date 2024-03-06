import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';


import { Modal } from '../src/components/Modal/Modal';
import { WhatsappForm } from '../src/components/WhatsappForm/WhatsappForm';
import { useModal } from '../src/hooks/useModal';
import Header from '../src/components/Header/Header';
import Search from '../src/components/Search/Search';
import FiltersLayout from '../src/components/FiltersLayout/FiltersLayout';
import Filters from '../src/containers/Filters/Filters';
import Realties from '../src/containers/Realties';

import { Context } from '../src/AppWrapper';
import { API_URL } from '../config';
import Grid from '../src/components/Grid/Grid';
import { relative } from 'path';
import { useFilters } from '../src/hooks/useFilters';

function MainPage({
    realties = [],
    locations = [],
}) {
    const { store } = useContext(Context);

    store.setRealties(realties);
    store.setLocations(locations);

    const {
        openModal: openWatsappForm,
        isOpen: isOpenWatsappFrom,
        closeModal: closeWatsappForm,
    } = useModal();

    const {
        filteredRealties,
        setFilters,
    } = useFilters(realties);

    return (
        <Grid>
            <Header searchNode={<Search />}/>

            <FiltersLayout>
                <Filters onSetFilters={setFilters} />
            </FiltersLayout>

            <Realties
                realties={filteredRealties}
                locations={locations}
            />

            <Modal
                isOpen={isOpenWatsappFrom}
                onClose={closeWatsappForm}
            >
                <WhatsappForm onClose={closeWatsappForm}/>
            </Modal>
        </Grid>
    );
}

export const getServerSideProps = (async (context) => {
        const [
            realtiesResponse,
            locationsResponse,
        ] = await Promise.all([
            fetch(`${API_URL}/realties`),
            fetch(`${API_URL}/locations`),
        ]);

        let realties = [];
        let locations = [];

        if (realtiesResponse.status === 200) {
            realties = await realtiesResponse.json();
        }

        if (locationsResponse.status === 200) {
            locations = await locationsResponse.json();
        }

        return { props: {
            realties,
            locations,
        }}
});

export default observer(MainPage);
