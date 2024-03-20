import { observer } from 'mobx-react-lite';
import { API_URL } from '~/config';
import Page from '~/src/components/Page/Page';
import Realty from '~/src/containers/Realty/Realty';

const RealtyPage = ({
    realty,
}) => (
    <Page>
        <Realty realty={realty} />
    </Page>
);

export const getServerSideProps = (async (context) => {
    const { id } = context.params;

    const realty = await (await fetch(`${API_URL}/realty/${id}`)).json();

    return { props: {
        realty,
    }}
});

export default observer(RealtyPage);
