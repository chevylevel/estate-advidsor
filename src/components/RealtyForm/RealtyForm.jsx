import { useRef, useState } from 'react';
import { Input } from '../Input/Input';
import { useRouter } from 'next/router';
import realtyForm from './realtyForm.module.css';
import useClickOutside from '../../hooks/useClickOutside';
import { API_URL } from '../../../config';

const RealtyForm = ({
    initialRealty,
    isEdit = false,
    onSubmit,
}) => {
    const router = useRouter();
    const ref = useRef();

    useClickOutside(ref, onSubmit);

    const [isFreehold, setIsFreehold] = useState(true);

    const refreshData = () => {
        router.replace(router.asPath, {}, { scroll: false });
    }

    const getSignData = async () => {
        const {
            apikey,
            timestamp,
            signature,
            cloudname,
        } = await signResponse.json();

        return {
            url: `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`,
            apikey,
            timestamp,
            signature,
        }
    }

    const uploadImages = async (imageFiles) => {
        if (!imageFiles.length) {
            return [];
        }

        const {
            url,
            apikey,
            timestamp,
            signature,
        } = await getSignData();

        const imagesFormData = new FormData();

        const urlImages = imageFiles.map(async (file) => {
            imagesFormData.append('file', file);
            imagesFormData.append('api_key', apikey);
            imagesFormData.append('timestamp', timestamp);
            imagesFormData.append('signature', signature);
            imagesFormData.append('folder', 'realty_images');

            const imageUploadResponse = await fetch(url, {
                method: 'POST',
                body: imagesFormData,
            });

            const {
                secure_url,
                public_id,
            } = await imageUploadResponse.json();

            return {
                secure_url,
                public_id,
            };
        });

        return Promise.all(urlImages);
    }

    const handleClickSubmit = async (e) => {
        e.preventDefault();

        const host = `${API_URL}/realties/${isEdit ? initialRealty.id : ''}`;

        const formData = new FormData(e.target.form);
        const imageUrls = await uploadImages(formData.getAll('images'));

        formData.set('images', JSON.stringify(imageUrls));

        try {

            console.log(...formData.entries('images'));

            const response = await fetch(
                host,
                {
                    method: isEdit ? 'PUT' : 'POST',
                    body: formData,
                }
            );

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
            const response = await fetch(
                `${API_URL}/realties/${initialRealty.id}/${image._id}/${image.public_id}`,
                {
                    method: 'PUT',
                }
            );

            if (response.ok) {
                refreshData();
            }
        } catch (error) {
            console.log('error:', error.message );
        }
    };

    return (
        <div
            ref={ref}
            className={realtyForm.content}
        >
            <h3>Лот</h3>

            <form id='realty'>
                <Input
                    labelText={'Название'}
                    name={'name'}
                    inintialValue={initialRealty?.name}
                    required
                />

                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                    <label
                        htmlFor='realty-type-select'
                        style={{ marginRight: '10px', fontSize: 'x-small' }}
                    >
                        Тип недвижимости
                    </label>

                    <select id='realty-type-select' name={'realtyType'}>
                        <option value="apartment">apartment</option>
                        <option value="penthouse">penthouse</option>
                        <option value="villa">villa</option>
                    </select>
                </div>

                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label
                            htmlFor='ownership'
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
                        />

                        <Input
                            labelText={'до'}
                            name={'squareMax'}
                            inintialValue={initialRealty?.squareMax}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    Стоимость

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            labelText={'от'}
                            name={'priceMin'}
                            inintialValue={initialRealty?.priceMin}
                        />

                        <Input
                            labelText={'до'}
                            name={'priceMax'}
                            inintialValue={initialRealty?.priceMax}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: 'small' }}>
                    ROI

                    <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                        <Input
                            labelText={'ROI Sale'}
                            name={'roiSale'}
                            inintialValue={initialRealty?.roiSale}
                        />

                        <Input
                            labelText={'ROI Rent'}
                            name={'roiRent'}
                            inintialValue={initialRealty?.roiRent}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Количество спален'}
                        name={'bedrooms'}
                        inintialValue={initialRealty?.bedrooms}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Input
                        labelText={'Вид из окна'}
                        name={'windowView'}
                        inintialValue={initialRealty?.bedrooms}
                    />
                </div>

                <div style={{ marginTop: '40px' }}>
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
                    <div
                        key={image}
                        style={{ position: 'relative' }}
                    >
                        <img src={image.secure_url} />

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
};

export default RealtyForm;
