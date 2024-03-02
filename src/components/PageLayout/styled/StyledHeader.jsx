import styled from '@emotion/styled';
import { css } from '@emotion/react';

const pageLayoutStyles = () => css`
    grid-column: 1 / last-line;
`

const StyledPageLayout = styled('div')(pageLayoutStyles);

export default StyledPageLayout;
