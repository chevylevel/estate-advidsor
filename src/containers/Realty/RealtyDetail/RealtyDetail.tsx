import { FC } from 'react';
import classNames from 'classnames';
import { Typography } from '@mui/material';

import realtyDetailStyles from './RealtyDetail.module.css';

interface RealtyDetailPropsType {
    name: string,
    range?: [min: number, max: number],
    value?: string,
    unit?: string,
}

const RealtyDetail: FC<RealtyDetailPropsType> = ({
    name,
    value = '',
    range = [],
    unit = '',
}) => {

    const [min, max] = range;

    return (
        <div className={realtyDetailStyles.content}>
            <Typography
                variant={'caption'}
                gutterBottom
            >
                {name}: &nbsp;
            </Typography>

            <Typography
                variant={'subtitle2'}
                gutterBottom
            >
                {value || `${min} - ${max} ${unit}`}
            </Typography>
        </div>
    );
}

export default RealtyDetail;
