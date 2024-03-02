import styled from '@emotion/styled';
import { css } from '@emotion/react';

const searchStyles = () => css`
    grid-column: 1 / last-line;
    height: 500px;

    & > img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`

const StyledSearch = styled('div')(searchStyles);

export default StyledSearch;
