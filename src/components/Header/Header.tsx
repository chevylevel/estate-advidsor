import { useContext, type FC, type ReactNode } from 'react';

import { Context } from '../../AppWrapper';
import LogoIcon from '../../../public/images/logo.svg';
import { observer } from 'mobx-react-lite';
import { IconButton } from '../IconButton/IconButton';
import { Modal } from '../Modal/Modal';
import { useModal } from '../../../src/hooks/useModal';
import { AuthForm } from '../AuthForm/AuthForm';
import LoginIcon from '../../../public/images/login.svg';
import LogoutIcon from '../../../public/images/logout.svg';
import header from './header.module.css';

type HeaderPropsType = {
    searchNode: ReactNode;
}

const Header: FC<HeaderPropsType> = ({
    searchNode,
}) => {
    const { store } = useContext(Context);

    const {
        handleClickOpenModal: handleClickOpenAuthForm,
        isOpen: isOpenAuthForm,
        handleClickCloseModal: handleClickCloseAuthForm,
    } = useModal();

    const authNode = (
        <div className={header.authControl}>
            {store.isAuth
                ? (
                    <>
                        <div className={header.text}>
                            {store.user?.email}
                        </div>

                        <IconButton
                            theme='light'
                            onClick={() => store.signOut()}
                        >
                            <LogoutIcon style={{ maxHeight: '30px', fill: '#ffffff' }} />
                        </IconButton>
                    </>
                )
                : (
                    <>
                        <div className={header.text}>вход / регистрация</div>
                        <IconButton
                            theme='light'
                            onClick={handleClickOpenAuthForm}
                        >
                            <LoginIcon
                                style={{ maxHeight: '30px', fill: '#ffffff' }}
                                // className={header.logo}
                            />
                        </IconButton>
                    </>
                )
            }
        </div>
    );

    return (
        <header className={header.layout}>
            <div className={header.wrapper}>
                <div className={header.substrate}></div>

                <div className={header.content}>
                    <div className={header.company}>
                        <LogoIcon className={header.logo} />

                        <div className={header.companyName}>estate adviser</div>
                    </div>

                    <h3 className={header.title}>
                        КАТАЛОГ ДОХОДНОЙ НЕДВИЖИМОСТИ
                    </h3>

                    {store.isLoading
                        ? null
                        : authNode
                    }
                </div>
            </div>

            <div className={header.background}>
                <div className={header.search}>
                    {searchNode}
                </div>

                <img
                    // className={search.background}
                    style={{
                        objectFit: 'cover',
                        height: '100%',
                        width: '100%',

                    }}
                    src={'/images/rice-paddies.jpg'}
                />
            </div>

            <Modal
                isOpen={isOpenAuthForm}
                onClose={handleClickCloseAuthForm}
            >
                <AuthForm onClose={handleClickCloseAuthForm} />
            </Modal>
        </header>
    );
}

export default observer(Header);
