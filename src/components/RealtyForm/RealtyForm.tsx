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
import ConstructionDeadlineField from './fields/ConstructionDeadlineField';
import LocationField from './fields/LocationFiled';
import OwnershipField from './fields/OwnershipField';
import TypeField from './fields/TypeField';
import Checkbox from '../Checkbox/Checkbox';

interface RealtyFormPropsType {
    initialRealty: Realty;
    locations: Location[];
    onSubmit: () => void;
}

const RealtyForm: FC<RealtyFormPropsType> = ({
    initialRealty,
    onSubmit,
}) => {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>();

    useClickOutside(ref, onSubmit);

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

            <form id={'realty'} className={realtyForm.form}>
                <Input
                    label={'Название'}
                    name={'name'}
                    initialValue={initialRealty?.name || ''}
                    required
                />

                <TypeField initialRealty={initialRealty} />

                <OwnershipField initialRealty={initialRealty} />

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    Жилая площадь

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            label={'от'}
                            name={'squareMin'}
                            initialValue={initialRealty?.squareMin || ''}
                        />

                        <Input
                            label={'до'}
                            name={'squareMax'}
                            initialValue={initialRealty?.squareMax || ''}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    Стоимость

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            label={'от'}
                            name={'priceMin'}
                            initialValue={initialRealty?.priceMin || ''}
                        />

                        <Input
                            label={'до'}
                            name={'priceMax'}
                            initialValue={initialRealty?.priceMax || ''}
                        />
                    </div>
                </div>


                <Checkbox
                    label={'With installment'}
                    name={'withInstallment'}
                    initialValue={initialRealty?.withInstallment}
                />

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    ROI

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            label={'ROI Sale'}
                            name={'roiSale'}
                            initialValue={initialRealty?.roiSale || ''}
                        />

                        <Input
                            label={'ROI Rent'}
                            name={'roiRent'}
                            initialValue={initialRealty?.roiRent || ''}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Количество спален'}
                        name={'bedrooms'}
                        initialValue={initialRealty?.bedrooms || ''}
                    />
                </div>

                <Checkbox
                    label={'With view'}
                    name={'withView'}
                    initialValue={initialRealty?.withView}
                />

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

                <LocationField initialRealty={initialRealty} />

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Заполняемость'}
                        name={'occupancy'}
                        initialValue={initialRealty?.occupancy || ''}
                    />
                </div>

                <Checkbox
                    label={'Possible to stay'}
                    name={'isPossibleToStay'}
                    initialValue={initialRealty?.isPossibleToStay}
                />

               <ConstructionDeadlineField initialRealty={initialRealty}/>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        label={'Описание'}
                        name={'description'}
                        initialValue={initialRealty?.description || ''}
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
