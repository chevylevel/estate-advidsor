import type {
    FC,
    ReactNode,
} from 'react';

import StyledPageGridLayout from './styled/StyledPageGridLayout';

export type PageGridLayoutPropsType = {
    children: ReactNode;
}

const PageGridLayout: FC<PageGridLayoutPropsType> = ({
    children,
}) => {
    return (
        <StyledPageGridLayout>
            {children}
        </StyledPageGridLayout>
    );
}

export default PageGridLayout;
