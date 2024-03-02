import styled from '@emotion/styled';
import { css } from '@emotion/react';

const realtyListStyles = () => css`
    grid-column: 1/-1;
    padding: 20px;
    margin: auto;
`
const StyledRealtyList = styled('div')(realtyListStyles);

export default StyledRealtyList;
