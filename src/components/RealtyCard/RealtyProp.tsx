import { useState } from 'react';
import realtyCard from './RealtyCard.module.css';
import { useRouter } from 'next/router';
import RealtyForm from '../RealtyForm/RealtyForm.jsx';
import Carousel from '../Carousel/Carousel';

import { API_URL } from '../../../config';

export const RealtyProp = ({
    name,
    value,
}) => {
    return  (
        <div className={realtyCard.prop}>
            <span className={realtyCard.propName}>
                {name}: &nbsp;
            </span>

            <span className={realtyCard.propValue}>
                {value}
            </span>
        </div>
    )
}
