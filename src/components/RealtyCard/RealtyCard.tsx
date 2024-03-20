import { MouseEvent, useContext, useState } from 'react';
import realtyCard from './RealtyCard.module.css';
import { useRouter } from 'next/router';;
import Carousel from '../Carousel/Carousel';

import EditIcon from '~/public/images/edit.svg';
import DeleteIcon from '~/public/images/delete.svg';
import MoreIcon from '~/public/images/more.svg';
import HeartIcon from '~/public/images/heart.svg';
import HeartRedIcon from '~/public/images/heartRed.svg';

import { RealtyProp } from './RealtyProp';
import { IconButton } from '../IconButton/IconButton';
import RealtyService from '~/src/services/Realty';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { Context } from '~/src/app/Context';

const RealtyCard = ({
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
    const { store } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openDetailsMenu = Boolean(anchorEl);

    const refreshData = () => {
        router.replace(router.asPath, {}, { scroll: false });
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onOpenRealtyForm(realty);
    };

    const handleDelete = async () => {
        console.log(id);
        await RealtyService.deleteRealty(id);

        refreshData();
    };

    const handleLike = async () => {
        store.handleLike(id);
    }

    const handleSeeDetailsMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleSeeDetails = () => {
        router.push({
            pathname: '/realty/[id]',
            query: { id },
        });

        handleClose();
    }

    const detailsMenu = (
        <Menu
            id={'basic-menu'}
            anchorEl={anchorEl}
            open={openDetailsMenu}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'details-button',
            }}
        >
            <MenuItem onClick={handleSeeDetails}>Details</MenuItem>
        </Menu>
    )

    return  (
        <div className={realtyCard.content}>
            <div className={realtyCard.gallery}>
                <Carousel
                    images={images}
                    widthDots
                />
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
                </div>
            </div>

            <div className={realtyCard.controls}>
                <div className={realtyCard.controlsLeft}>
                    <IconButton onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton onClick={handleLike}>
                        {store.isFavorite(id) ? <HeartRedIcon/> : <HeartIcon/>}
                    </IconButton>
                </div>

                <IconButton
                    id={'details-button'}
                    aria-controls={openDetailsMenu ? 'basic-menu' : undefined}
                    aria-haspopup={'true'}
                    aria-expanded={openDetailsMenu ? 'true' : undefined}
                    onClick={handleSeeDetailsMenu}
                >
                    <MoreIcon />
                </IconButton>

                {detailsMenu}
            </div>
        </div>
    )
}

export default observer(RealtyCard);
