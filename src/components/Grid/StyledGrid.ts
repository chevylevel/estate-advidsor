import styled from '@emotion/styled';
import { css } from '@emotion/react';

const gridStyles = ({
    smCols,
    mdCols,
    lgCols,
    xlCols,
}) => css`
    display: grid;

    grid-template-columns: minmax(0, 1fr);

    @media (min-width: 425px) {
        grid-template-columns: repeat(${smCols}, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(${mdCols}, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(${lgCols}, 1fr);
    }

    @media (min-width: 1280px) {
        grid-template-columns: repeat(${xlCols}, 1fr);
    }
`
const StyledGrid = styled('div')(gridStyles);

export default StyledGrid;
