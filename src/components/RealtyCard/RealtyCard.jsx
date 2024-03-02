import { useState } from 'react';
import realtyCard from './RealtyCard.module.css';
import { useRouter } from 'next/router';
import RealtyForm from '../RealtyForm/RealtyForm';
import Carousel from '../Carousel/Carousel.tsx';

import EditIcon from '~/public/images/edit.svg';
import DeleteIcon from '~/public/images/delete.svg';
import HeartIcon from '~/public/images/heart.svg';

import { RealtyProp } from './RealtyProp';
import { IconButton } from '../IconButton/IconButton';
import RealtyService from '~/src/services/Realty';

export const RealtyCard = ({
    realty,
    onOpenRealtyForm,
}) => {
    const {
        _id: id,
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
    } = realty;

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath, {}, { scroll: false });
    }

    const handleEdit = () => {
        onOpenRealtyForm(realty);
    };

    const handleDelete = async () => {
        console.log(id);
        await RealtyService.deleteRealty(id);

        refreshData();
    };

    const handleLike = (id) => {
        console.log(id);
    }

    return  (
        <div className={realtyCard.content}>
            <div className={realtyCard.gallery}>
                <Carousel images={images}/>
            </div>

            <div className={realtyCard.flex}>
                <div className={realtyCard.properties}>
                    <div className={realtyCard.title}>{name}</div>

                    <RealtyProp
                        name={'расположение'}
                        value={location}
                    />

                    <RealtyProp
                        name={'цена'}
                        value={priceMin + '-' + priceMax + '$'}
                    />

                    <div className={realtyCard.details}>
                        <div>тип: {realtyType}</div>
                        <div>статус строительства: {constructionStatus}</div>
                        <div>владение: {ownership}</div>
                        <div>{ownershipPeriod}</div>
                        <div>ROI от продажи: {roiSale}</div>
                        <div>ROI от аренды: {roiRent}</div>
                        <div>площадь от {squareMin} до {squareMax}</div>
                        <div>количество спален: {bedrooms}</div>
                        <div>вид из окна: {windowView}</div>
                        <div>площадь участка: {landSquare}</div>
                        <div>заполняемость: {occupancy}</div>
                        <div>до пляжа: {beachDistance}</div>
                        <div>проживание: {livingPossibility}</div>
                        <div>{description}</div>
                    </div>

                    <div className={realtyCard.controls}>
                        <IconButton onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>

                        <IconButton onClick={handleLike}>
                            <HeartIcon />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className={realtyCard.controls}>

            </div>
        </div>
    )
}
