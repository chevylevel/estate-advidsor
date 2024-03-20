import RealtyCard from '../RealtyCard/RealtyCard';
import AddIcon from '../../../public/images/add.svg';
import realtyList from './RealtyList.module.css';

import Grid from '../Grid/Grid';
import { IconButton } from '../IconButton/IconButton';
import { FC } from 'react';
import { Realty } from '../../models/Realty';

interface RealtyListPropsType {
    realties: Realty[];
    withCreateControl?: boolean;
    onOpenRealtyForm?: (realty?: Realty) => void
}

const RealtyList:FC<RealtyListPropsType> = ({
    realties = [],
    withCreateControl = false,
    onOpenRealtyForm = () => {},
}) => {
    return (
        <Grid
            mdCols={2}
            lgCols={3}
            xlCols={4}
            className={realtyList.content}
        >
            {withCreateControl
                ? (
                    <div className={realtyList.add}>
                        <IconButton onClick={() => onOpenRealtyForm()}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                )
                : null
            }

            {realties.map((realty) => (
                <RealtyCard
                    key={realty._id}
                    realty={realty}
                    onOpenRealtyForm={onOpenRealtyForm}
                />
            ))}
        </Grid>
    );
}

export default RealtyList;
