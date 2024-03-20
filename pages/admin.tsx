import { Input } from '../src/components/Input/Input';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { IconButton } from '~/src/components/IconButton/IconButton';
import EditIcon from '~/public/images/edit.svg';
import DeleteIcon from '~/public/images/delete.svg';
import useClickOutside from '~/src/hooks/useClickOutside';
import Page from '~/src/components/Page/Page';
import { observer } from 'mobx-react-lite';
import { Location } from '~/src/models/Location';
import { API_URL } from '~/config';
import { Context } from '~/src/app/Context';


const AdminPage = () => {
    const { store } = useContext(Context);
    const ref = useRef<HTMLInputElement>(null);

    useClickOutside(ref, handleClickOutside);

    const [locationOnEdit, setLocationOnEdit] = useState<Location | null>(null);
    const [value, setValue] = useState('');

    const handleAddLocation = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target.form);
        store.addLocation(formData).then(() => setValue(''));
    }

    const handleEditLocation = (e: MouseEvent<HTMLButtonElement>, id, name) => {
        e.preventDefault();

        setLocationOnEdit({ _id: id, name });
    }

    const handleDeleteLocation = (id, e) => {
        e.preventDefault();

        store.deleteLocation(id);
    }

    function handleClickOutside() {
        if (store.locations.some(location => location._id === locationOnEdit?._id
            && location.name === locationOnEdit.name)
        ) {
            setLocationOnEdit(null);

            return;
        }

        store.updateLocation(locationOnEdit?._id, locationOnEdit?.name)
            .then(() => { setLocationOnEdit(null) });
    }

    const handleChange = (id, value) => {
        setLocationOnEdit(({ _id: id, name: value }))
    }

    useEffect(
        () => {
            fetch(`${API_URL}/locations`).then(res => {
                if (res.ok) {
                    res.json().then(data => store.setLocations(data))
                }
            });
        },
        [],
    );

    return (
        <Page>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 50px 50px'}}>
                <h4>Locations</h4>

                <form name={'locations'}>
                    <Input
                        label={'location'}
                        name={'name'}
                        onChange={(e: MouseEvent<HTMLInputElement>) => setValue(e?.currentTarget?.value)}
                        value={value}
                    />

                    <button
                        style={{ marginTop: '10px' }}
                        onClick={handleAddLocation}
                    >
                        oтправить
                    </button>
                </form>

                <div style={{ padding: '20px 0' }}>
                    {store.locations.map(location => (
                        <div
                            key={location._id}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            {location._id === locationOnEdit?._id
                                ? (
                                    <Input
                                        ref={ref}
                                        label={'name'}
                                        name={'name'}
                                        initialValue={location.name}
                                        onChange={(id) => handleChange(id, location.name)}
                                    />
                                )
                                : <span>{location.name}</span>
                            }

                            <div style={{ display: 'flex'}}>
                                <IconButton onClick={(e) => handleEditLocation(e, location._id, location.name)}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton onClick={(e) => handleDeleteLocation(location._id, e)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
}

export default observer(AdminPage);

