import { Typography } from '@mui/material';

import Page from '~/src/components/Page/Page';
import RealtyList from '../src/components/RealtyList/RealtyList';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '~/src/app/Context';

const AccountPage = ({ }) => {
    const { store } = useContext(Context);

    return (
        <Page>
            <div style={{
                backgroundColor: '#dcdcdc',
                padding: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '40px 0',
            }}>
                <Typography variant={'h4'}>
                    Favorites
                </Typography>
            </div>

            <RealtyList realties={store.getFavorites() || []} />
        </Page>
    );
}

export default observer(AccountPage);
