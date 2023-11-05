import { useState } from 'react';
import AdminPage from '../../../pages/admin';
import realtyCard from './RealtyCard.module.css';
import { HOST } from '../../../constants';
import { useRouter } from 'next/router';

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
            const response = await fetch(`${HOST}/api/realties/${id}`, {
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
                    <AdminPage
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

                        { images.map(image => <img src={`${HOST}/${image}`} />) }
                    </div>
                )
            }

            <button
                className={realtyCard.editButton}
                onClick={handleEdit}
            >
                {isEditMode ? 'cancel editing' : 'edit'}
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
