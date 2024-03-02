import type {
    FC,
    ReactNode,
} from 'react';

import StyledGrid from './StyledGrid';

export type GridPropsType = {
    children: ReactNode;
    className?: string;
    smCols?: number,
    mdCols?: number,
    lgCols?: number,
    xlCols?: number,
}

const Grid: FC<GridPropsType> = ({
    className = '',
    children,
    smCols = 1,
    mdCols = 1,
    lgCols = 1,
    xlCols = 1,
}) => (
    <StyledGrid
        className={className}
        smCols={smCols}
        mdCols={mdCols}
        lgCols={lgCols}
        xlCols={xlCols}
    >
        {children}
    </StyledGrid>
);

export default Grid;
