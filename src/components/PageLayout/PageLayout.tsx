import type {
    FC,
    ReactNode,
} from 'react';

import StyledPageGridLayout from './styled/StyledPageGridLayout';
import StyledHeader from './styled/StyledHeader';
import StyledFilters from './styled/StyledFilters';
import StyledSearch from './styled/StyledSearch';
import StyledCatalogue from './styled/StyledCatalogue';


export type PageGridLayoutPropsType = {
    headerNode: ReactNode;
    catalogueNode: ReactNode;
    filtersNode: ReactNode;
    searchNode: ReactNode;
    children: ReactNode;
}

const PageGridLayout: FC<PageGridLayoutPropsType> = ({
    headerNode,
    catalogueNode,
    filtersNode,
    searchNode,
    children,
}) => {
    return (
        <StyledPageGridLayout>
            <StyledHeader>
                {headerNode}
            </StyledHeader>

            <StyledSearch>
                {searchNode}
            </StyledSearch>

            <StyledFilters>
                {filtersNode}
            </StyledFilters>

            <StyledCatalogue>
                {catalogueNode}
            </StyledCatalogue>

            {children}
        </StyledPageGridLayout>
    );
}

export default PageGridLayout;
