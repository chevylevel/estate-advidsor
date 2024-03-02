import { FC, useRef, useState } from 'react';
import { Input } from '../Input/Input';
import { useRouter } from 'next/router';
import realtyForm from './realtyForm.module.css';
import useClickOutside from '../../hooks/useClickOutside';
import { API_URL } from '../../../config';
import CloudinaryService from '../../services/Cloudinary';
import RealtyService from '../../services/Realty';
import { Realty } from '~/src/models/Realty';
import { Location } from '~/src/models/Location';

interface RealtyFormPropsType {
    initialRealty: Realty;
    locations: Location[];
    onSubmit: () => void;
}

const RealtyForm: FC<RealtyFormPropsType> = ({
    initialRealty,
    locations = [],
    onSubmit,
}) => {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>();

    useClickOutside(ref, onSubmit);

    const [isFreehold, setIsFreehold] = useState(true);
    const [location, setLocation] = useState(initialRealty?.location);

    const refreshData = () => {
        router.replace(router.asPath, {}, { scroll: false });
    }

    const handleClickSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target.form);
        const uploadedImages = await uploadImages(e.target.form.images.files);
        formData.set('images', uploadedImages);

        const response = initialRealty
            ? await RealtyService.updateRealty(
                initialRealty._id,
                formData,
            )
            : await RealtyService.createRealty(formData)

        if (response?.status === 200) {
            onSubmit();
            refreshData();
        }
    }

    const handleSelectOwnership = (e) => {
        setIsFreehold(e.target.value === 'freehold');
    }

    const handleRemoveImage = async (image) => {
        try {
            const response = await fetch(
                `${API_URL}/realty/${initialRealty._id}/${image._id}`,
                {
                    method: 'PUT',
                }
            );

            if (response.ok) {
                refreshData();
            }
        } catch (error) {
            console.error('error:', error.message );
        }
    };

    const handleChangeLocation = (e) => {
        setLocation(e.currentTarget.value);
    }

    const uploadImages = async (images) => {
        if (!images.length) {
            return null;
        }

        const uploadResponse = await Promise.all(
            Array.from(images).map(CloudinaryService.uploadImage)
        );

        return JSON.stringify(uploadResponse.map(({
            data: {
                public_id,
                secure_url
            }
        }) => ({
            id: public_id,
            url: secure_url,
        })));
    }

    return (
        <div
            ref={ref}
            className={realtyForm.content}
        >
            <h4>
                Добаить лот
            </h4>
            <form id={'realty'}>
                <Input
                    label={'Название'}
                    name={'name'}
                    initialValue={initialRealty?.name}
                    required
                />

                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                    <label
                        htmlFor='realty-type-select'
                        style={{ marginRight: '10px', fontSize: 'small' }}
                    >
                        Тип недвижимости
                    </label>

                    <select id='realty-type-select' name={'realtyType'} style={{ padding: '5px'}}>
                        <option value="apartment">apartment</option>
                        <option value="penthouse">penthouse</option>
                        <option value="villa">villa</option>
                    </select>
                </div>

                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label
                            htmlFor='ownership'
                            style={{ marginRight: '10px', fontSize: 'small' }}
                        >
                            Тип  владения
                        </label>

                        <select
                            id='ownership-select'
                            name={'ownership'}
                            style={{ padding: '5px'}}
                            onChange={handleSelectOwnership}
                        >
                            <option value='freehold'>freehold</option>
                            <option value='leasehold'>leasehold</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Input
                            label={'Срок'}
                            name={'ownershipPeriod'}
                            {...(isFreehold ?  { disabled: true, value: '' } : {})}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    Жилая площадь

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            initialValue={initialRealty?.squareMin}
                            label={'от'}
                            name={'squareMin'}
                        />

                        <Input
                            label={'до'}
                            name={'squareMax'}
                            initialValue={initialRealty?.squareMax}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    Стоимость

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            label={'от'}
                            name={'priceMin'}
                            initialValue={initialRealty?.priceMin}
                        />

                        <Input
                            label={'до'}
                            name={'priceMax'}
                            initialValue={initialRealty?.priceMax}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    ROI

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            label={'ROI Sale'}
                            name={'roiSale'}
                            initialValue={initialRealty?.roiSale}
                        />

                        <Input
                            label={'ROI Rent'}
                            name={'roiRent'}
                            initialValue={initialRealty?.roiRent}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Количество спален'}
                        name={'bedrooms'}
                        initialValue={initialRealty?.bedrooms}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Вид из окна'}
                        name={'windowView'}
                        initialValue={initialRealty?.windowView}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    Площадь участка

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            label={'от'}
                            name={'landSquareMin'}
                            initialValue={initialRealty?.landSquareMin || ''}
                        />

                        <Input
                            label={'до'}
                            name={'landSquareMax'}
                            initialValue={initialRealty?.landSquareMax || ''}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <label
                        htmlFor='location'
                        style={{ marginRight: '10px', fontSize: 'small' }}
                    >
                        Расположение
                    </label>

                    <select
                        id='location-select'
                        name={'location'}
                        style={{ padding: '5px'}}
                        value={location}
                        onChange={handleChangeLocation}
                    >
                        {locations.map(location => (
                            <option
                                key={location._id}
                                value={location.name}
                            >
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Заполняемость'}
                        name={'occupancy'}
                        initialValue={initialRealty?.occupancy}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Расстояние до пляжа'}
                        name={'beachDistance'}
                        initialValue={initialRealty?.beachDistance}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Возможность проживания'}
                        name={'livingPossibility'}
                        initialValue={initialRealty?.livingPossibility}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Стадия строительства'}
                        name={'constructionStatus'}
                        initialValue={initialRealty?.constructionStatus}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Описание'} name={'description'}
                        initialValue={initialRealty?.description}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Изображение'}
                        name={'images'}
                        type={'file'}
                        multiple
                    />
                </div>
            </form>

            {initialRealty && (
                <div className={realtyForm.images}>
                    {initialRealty.images.map(image =>
                        <div
                            key={image.id}
                            className={realtyForm.imageContainer}
                        >
                            <img
                                className={realtyForm.image}
                                src={image.url}
                            />

                            <button
                                style={{ position: 'absolute', top: 0, right: 0 }}
                                onClick={() => handleRemoveImage(image)}
                            >
                                delete
                            </button>
                        </div>
                    )}
                </div>
            )}

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
};

export default RealtyForm;
