import { Input } from '../src/components/Input/Input';
import PageLayout from '../src/components/PageLayout/PageLayout';

const AdminPage = ({}) => {
    const handleSaveLocation = () => {};

    return (
        <PageLayout>
            <div>Добавить локацию</div>

            <Input labelText={'локация'} />

            <button onClick={handleSaveLocation}>
                сохранить
            </button>
        </PageLayout>
    );
}

export default AdminPage;
