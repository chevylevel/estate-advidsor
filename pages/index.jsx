import { DeveloperCard } from '../src/components/Developer/DeveloperCard';
import { Textarea } from '../src/components/Textarea/Textarea';
import { List } from '../src/components/List/List';
import { Modal } from '../src/components/Modal/Modal';
import { WhatsappForm } from '../src/components/WhatsappForm/WhatsappForm';
import { useModal } from '../src/hooks/useModal';
import developers from '../src/mocks/developers';
import { Filters } from '../src/components/Filters/Filters';
import { useState } from 'react';

export default function MainPage() {
    const {
        handleClickOpenModal,
        isOpen,
        handleClickCloseModal,
    } = useModal();

    const [visibleDevs, setVisibleDevs] = useState(developers);

    const handleSelectLocation = (ids) => {
        console.log('###### ids:', ids);
        const filteredDevs = developers.filter(({ location }) => {
            console.log('######:', ids.includes(location.id));
            return ids.includes(location.id);
        });
        console.log('######filteredDevs:', filteredDevs);

        setVisibleDevs(ids.length ? filteredDevs : developers);
    }

    return (
        <>
            <div style={{padding: '0 50px'}}>
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '50px 0',
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
                        value={`Виллу в 5 минутах от океана, на две спальни, стоимостью до $150000, в Чангу`}
                    />
                </div>

                <div style={{
                    margin: '100px 0',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button onClick={handleClickOpenModal}>Получить каталог с самыми лучшими предложениями</button>
                </div>

                <div style={{marginBottom: '20px'}}>
                    <Filters onSelect={handleSelectLocation}/>
                </div>

                <List>
                    {visibleDevs.map((dev) => {
                        const {
                            name,
                            price,
                            location,
                            square,
                            isConstructionFinish
                        } = dev;

                        return  (
                            <DeveloperCard
                                name={name}
                                price={price}
                                location={location.name}
                                square={square}
                                isConstructionFinish={isConstructionFinish}
                            />
                        );
                    })}
                </List>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={handleClickCloseModal}
            >
                <WhatsappForm onClose={handleClickCloseModal}/>
            </Modal>
        </>
    );
}
