import type {
    FC,
    ReactNode,
} from 'react';

import Header from '../Header/Header';
import { useModal } from '~/src/hooks/useModal';
import { Modal } from '../Modal/Modal';
import AuthForm from '../AuthForm/AuthForm';
import StyledPage from './StyledPage';
import Footer from '../Footer/Footer';


export type PagePropsType = {
    children: ReactNode;
}

const Page: FC<PagePropsType> = ({
    children,
}) => {
    const {
        openModal: handleClickOpenAuthForm,
        isOpen: isOpenAuthForm,
        closeModal: handleClickCloseAuthForm,
    } = useModal();

    return (
        <StyledPage>
            <Header onOpenAuthForm={handleClickOpenAuthForm} />

            {children}

            <Modal
                isOpen={isOpenAuthForm}
                onClose={handleClickCloseAuthForm}
            >
                <AuthForm onClose={handleClickCloseAuthForm} />
            </Modal>

            <Footer/>
        </StyledPage>
    );
}

export default Page;
