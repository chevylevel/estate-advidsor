import { useState } from 'react';
import realtyCard from './RealtyCard.module.css';
import { useRouter } from 'next/router';
import RealtyForm from '../RealtyForm/RealtyForm';
import { API_URL } from '../../../config';

export const RealtyCard = ({
    id,
    name,
    realtyType,
    ownership,
    ownershipPeriod,
    roiSale,
    roiRent,
    priceMin,
    priceMax,
    squareMin,
    squareMax,
    bedrooms,
    windowView,
    landSquare,
    location,
    occupancy,
    beachDistance,
    livingPossibility,
    constructionStatus,
    description,
    images,
}) => {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEdit = () => {
        setIsEditMode((prev) => {
            return !prev;
        });
    };

    const refreshData = () => {
        router.replace(router.asPath, {}, { scroll: false });
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/realties/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                refreshData();
            }
        } catch (error) {
            console.log('error:', error.message );
        }
    };

    const handleSubmit = (isEditMode) => {
        if (!isEditMode) {
            setIsEditMode(false);
        }
    }

    return  (
        <div className={realtyCard.content} >
            { isEditMode
                ? (
                    <RealtyForm
                        initialRealty={{
                            id,
                            name,
                            realtyType,
                            ownership,
                            ownershipPeriod,
                            roiSale,
                            roiRent,
                            priceMin,
                            priceMax,
                            squareMin,
                            squareMax,
                            bedrooms,
                            windowView,
                            landSquare,
                            location,
                            occupancy,
                            beachDistance,
                            livingPossibility,
                            constructionStatus,
                            description,
                            images
                        }}
                        isEdit={isEditMode}
                        onSubmit={handleSubmit}
                    />
                )
                : (
                    <div>
                        <h3>{ name }</h3>

                        <div>Цены:  от { priceMin } до { priceMax }</div>

                        <div>Расположение: { location }</div>

                        <div>Площадь: { squareMin }</div>

                        <div>Срок завершения строительства: { constructionStatus }</div>

                        <div>Количество спален: { bedrooms }</div>

                        { images.map(image => <img className={realtyCard.image} key={image} src={image.secure_url} />) }
                    </div>
                )
            }

            <button
                className={realtyCard.editButton}
                onClick={handleEdit}
            >
                {isEditMode ? 'close editing' : 'edit'}
            </button>

            <button
                className={realtyCard.deleteButton}
                onClick={handleDelete}
            >
                delete
            </button>
        </div>
    );
}
