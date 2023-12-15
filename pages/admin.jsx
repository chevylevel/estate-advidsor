import { useState } from 'react';
import { Input } from '../src/components/Input/Input';
import PageLayout from '../src/components/PageLayout/PageLayout';
import UserService from '../src/services/UserService';

const AdminPage = ({}) => {
    const handleSaveLocation = () => {};
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();

            console.log('response', response);
            setUsers(response?.data || [])
        } catch (error) {

        }
    }

    return (
        <PageLayout>
            <div>
                <div>Добавить локацию</div>

                <Input labelText={'локация'} />

                <button onClick={handleSaveLocation}>
                    сохранить
                </button>
            </div>

            <div style={{ marginTop: '40px' }}>
                <button onClick={getUsers}>получить пользователей</button>

                {users.map(user => <div>{user.email}</div>)}
            </div>
        </PageLayout>
    );
}

export default AdminPage;
