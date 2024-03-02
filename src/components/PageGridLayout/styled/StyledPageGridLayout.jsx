import styled from '@emotion/styled';
import { css } from '@emotion/react';

const pageGridLayoutStyles = () => css`
    display: grid;

    grid-template-columns: 1fr;

    /* @media (min-width: 425px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    } */

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1440px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

const StyledPageGridLayout = styled('div')(pageGridLayoutStyles);

export default StyledPageGridLayout;
