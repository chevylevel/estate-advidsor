import { useState } from 'react';
import { HOST } from '../../../constants';
import { Input } from '../Input/Input';
import { useRouter } from 'next/router';
import realtyForm from './realtyForm.module.css';

const RealtyForm = ({
    initialRealty,
    isEdit = false,
    onSubmit,
}) => {
    const [isFreehold, setIsFreehold] = useState(true);

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath, {}, { scroll: false });
    }

    const handleClickSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${HOST}/api/realties/${isEdit ? initialRealty.id : ''}`, {
                method: isEdit ? 'PUT' : 'POST',
                body: new FormData(e.target.form),
            });

            if (response.ok) {
                onSubmit();
                refreshData();
            }
        } catch (error) {
            console.log('error:', error.message );
        }
    }

    const handleSelectOwnership = (e) => {
        setIsFreehold(e.target.value === 'freehold');
    }

    const handleRemoveImage = async (image) => {
        try {
            const response = await fetch(`${HOST}/api/realties/${initialRealty.id}/${image}`, {
                method: 'PUT',
            });

            if (response.ok) {
                refreshData();
            }
        } catch (error) {
            console.log('error:', error.message );
        }
    }

    return (
        <div className={realtyForm.content}>
            <h3>Лот</h3>

            <form id='realty'>
                <Input
                    labelText={'Название'}
                    name={'name'}
                    inintialValue={initialRealty?.name}
                />

                <div style={{  marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                    <label
                        for='realty-type-select'
                        style={{marginRight: '10px', fontSize: 'x-small'}}
                    >
                        Тип недвижимости
                    </label>

                    <select id='realty-type-select' name={'realtyType'}>
                        <option value="apartment">apartment</option>
                        <option value="penthouse">penthouse</option>
                        <option value="villa">villa</option>
                    </select>
                </div>

                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label
                            for='ownership'
                            style={{ marginRight: '10px', fontSize: 'x-small' }}
                        >
                            Тип  владения
                        </label>

                        <select
                            id='ownership-select'
                            name={'ownership'}
                            onChange={handleSelectOwnership}
                        >
                            <option value='freehold'>freehold</option>
                            <option value='leasehold'>leasehold</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Input
                            labelText={'Срок'}
                            name={'ownershipPeriod'}
                            {...(isFreehold ?  { disabled: true, value: '' } : {})}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    Площадь

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            inintialValue={initialRealty?.squareMin}
                            labelText={'от'}
                            name={'squareMin'}
                            required
                        />

                        <Input
                            labelText={'до'}
                            name={'squareMax'}
                            required inintialValue={initialRealty?.squareMax}
                        />
                    </div>
                </div>

                <div style={{marginTop: '10px', fontSize: 'small'}}>
                    Стоимость

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            labelText={'от'}
                            name={'priceMin'}
                            inintialValue={initialRealty?.priceMin}
                            required
                        />

                        <Input
                            labelText={'до'}
                            name={'priceMax'}
                            inintialValue={initialRealty?.priceMax}
                            required
                        />
                    </div>
                </div>

                <div style={{marginTop: '10px', fontSize: 'small'}}>
                    ROI

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            labelText={'ROI Sale'}
                            name={'roiSale'}
                            inintialValue={initialRealty?.roiSale}
                            required
                        />

                        <Input
                            labelText={'ROI Rent'}
                            name={'roiRent'}
                            inintialValue={initialRealty?.roiRent}
                            required
                        />
                    </div>
                </div>

                <div style={{marginTop: '40px'}}>
                    <Input
                        labelText={'Количество спален'}
                        name={'bedrooms'}
                        inintialValue={initialRealty?.bedrooms}
                    />
                </div>

                <div style={{marginTop: '40px'}}>
                    <Input
                        labelText={'площадь участка'}
                        name={'landSquare'}
                        inintialValue={initialRealty?.landSquare}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Локация'}
                        name={'location'}
                        inintialValue={initialRealty?.location}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Заполняемость'}
                        name={'occupancy'}
                        inintialValue={initialRealty?.occupancy}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Расстояние до пляжа'}
                        name={'beachDistance'}
                        inintialValue={initialRealty?.beachDistance}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Возможность проживания'}
                        name={'livingPossibility'}
                        inintialValue={initialRealty?.livingPossibility}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Стадия строительства'}
                        name={'constructionStatus'}
                        inintialValue={initialRealty?.constructionStatus}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Описание'} name={'description'}
                        inintialValue={initialRealty?.description}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Изображение'}
                        name={'images'}
                        type={'file'}
                        multiple
                    />
                </div>
            </form>

            {isEdit
                ? initialRealty.images.map(image =>
                    <div style={{position: 'relative'}}>
                        <img src={`${HOST}/${image}`} />
                        <button
                            style={{ position: 'absolute', top: 0, right: 0 }}
                            onClick={() => handleRemoveImage(image)}
                        >
                            delete
                        </button>
                    </div>
                )
                : null
            }

            <div className={realtyForm.submitButton}>
                <button
                    type='submit'
                    form='realty'
                    onClick={handleClickSubmit}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}

export default RealtyForm;
