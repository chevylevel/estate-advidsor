import { Textarea } from '../src/components/Textarea/Textarea';
import { Modal } from '../src/components/Modal/Modal';
import { WhatsappForm } from '../src/components/WhatsappForm/WhatsappForm';
import { useModal } from '../src/hooks/useModal';
import { Filters } from '../src/components/Filters/Filters';
import { useEffect, useState } from 'react';
import { HOST } from '../constants';
import RealtyForm from '../src/components/RealtyForm/RealtyForm';
import RealtyList from '../src/components/RealtyList/RealtyList';
import PageLayout from '../src/components/PageLayout/PageLayout';

export default function MainPage({ realties = [] }) {
    const {
        handleClickOpenModal: handleClickOpenWatsappForm,
        isOpen: isOpenWatsappFrom,
        handleClickCloseModal: handleClickCloseWatsappForm,
    } = useModal();

    const {
        handleClickOpenModal: handleClickOpenRealtyForm,
        isOpen: isOpenRealtyForm,
        handleClickCloseModal: handleClickCloseRealtyForm,
    } = useModal();

    const [visibleRealties, setvisibleRealties] = useState(realties);

    useEffect(
        () => {
            setvisibleRealties(realties);
        },
        [realties],
    );

    const handleSelectLocation = (ids) => {
        const filteredRealties = realties.filter(({ location }) => {
            return ids.includes(location.id);
        });

        setvisibleRealties(ids.length ? filteredRealties : realties);
    }

    return (
        <PageLayout>
            <div style={{padding: '0 50px'}}>
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <img src="/images/logo.svg" style={{width:'150px'}}/>
                    <div>AI ассистент подбора жилья</div>
                    <img src="/images/bali.svg" style={{width:'80px', marginBottom: '20px'}}/>
                </div>

                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '50px 0 100px'}}>
                    <div style={{fontSize: '32px'}}>Лоты от застройщиков</div>
                    <div>в одном месте</div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Textarea
                        labelText={'Подберите себе недвижимость, указав любые желаемые параметры:'}
                        initialValue={`Виллу в 5 минутах от океана, на две спальни, стоимостью до $150000, в Чангу`}
                    />
                </div>

                <div style={{
                    margin: '100px 0',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button onClick={handleClickOpenWatsappForm}>Получить каталог с самыми лучшими предложениями</button>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <Filters onSelect={handleSelectLocation}/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' ,margin: '50px' }}>
                    <button onClick={handleClickOpenRealtyForm}>
                        добавить недвижимость
                    </button>
                </div>

                <RealtyList realties={visibleRealties} />
            </div>

            <Modal
                isOpen={isOpenWatsappFrom}
                onClose={handleClickCloseWatsappForm}
            >
                <WhatsappForm onClose={handleClickCloseWatsappForm}/>
            </Modal>

            <Modal
                isOpen={isOpenRealtyForm}
                onClose={handleClickCloseRealtyForm}
            >
                <RealtyForm onClose={handleClickCloseRealtyForm}/>
            </Modal>
        </PageLayout>
    );
}

export const getStaticProps = (async (context) => {
        const res = await fetch(`${HOST}/api/realties`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Host': 'https://*.vercel.app/',
                'Accept': 'application/json'
            },
        });

        let realties = [];

        if (res.status === 200) {
            realties = await res.json();
        }

        return { props: { realties } }
});
