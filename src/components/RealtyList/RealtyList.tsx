import { RealtyCard } from '../RealtyCard/RealtyCard';
import StyledRealtyList from './StyledRealtyList';
import AddIcon from '../../../public/images/add.svg';
import realtyList from './RealtyList.module.css';

import Grid from '../Grid/Grid';
import { IconButton } from '../IconButton/IconButton';

const RealtyList = ({
    realties,
    onOpenRealtyForm
}) => {
    return (
        <Grid
            mdCols={2}
            lgCols={3}
            xlCols={4}
            className={realtyList.content}
        >
            <div className={realtyList.add}>
                <IconButton onClick={() => onOpenRealtyForm()}>
                    <AddIcon/>
                </IconButton>
            </div>

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
