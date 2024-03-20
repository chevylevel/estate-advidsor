import { useContext, type FC } from 'react';
import LogoIcon from '../../../public/images/logo.svg';
import { observer } from 'mobx-react-lite';
import { IconButton } from '../IconButton/IconButton';
import LoginIcon from '../../../public/images/login.svg';
import LogoutIcon from '../../../public/images/logout.svg';
import header from './header.module.css';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { Context } from '~/src/app/Context';

type HeaderPropsType = {
    onOpenAuthForm
}

const Header: FC<HeaderPropsType> = ({
    onOpenAuthForm,
}) => {
    const { store } = useContext(Context);

    const authNode = (
        <div className={header.authControl}>
            {store.isAuth
                ? (
                    <>
                        <Link
                            className={header.userName}
                            href={'/account'}
                        >
                            {store.user?.email}
                        </Link>

                        <IconButton
                            onClick={() => store.signOut()}
                        >
                            <LogoutIcon style={{ maxHeight: '30px', fill: '#6d6d6d' }} />
                        </IconButton>
                    </>
                )
                : (
                    <>
                        <div className={header.userName}>вход / регистрация</div>

                        <IconButton
                            onClick={onOpenAuthForm}
                        >
                            <LoginIcon style={{ maxHeight: '30px', fill: '#6d6d6d' }}/>
                        </IconButton>
                    </>
                )
            }
        </div>
    );

    return (
        <header className={header.layout}>
            <div className={header.content}>
                <div className={header.company}>
                    <LogoIcon className={header.logo} />

                    <Link
                        className={header.companyName}
                        href={'/'}
                    >
                        estate adviser
                    </Link>
                </div>

                <Typography
                    variant={'h5'}
                    className={header.title}
                >
                    profitable real estate
                </Typography>

                {store.isLoading
                    ? null
                    : authNode
                }
            </div>
        </header>
    );
}

export default observer(Header);
