
import PageGridLayout from '../src/components/PageGridLayout/PageGridLayout';
import { Input } from '../src/components/Input/Input';
import Form from '../src/components/Form/Form';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import LocationService from '~/src/services/Location';
import { useLocations } from '~/src/hooks/useLocations';
import { IconButton } from '~/src/components/IconButton/IconButton';
import EditIcon from '~/public/images/edit.svg';
import DeleteIcon from '~/public/images/delete.svg';
import useClickOutside from '~/src/hooks/useClickOutside';


const AdminPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const { locations, fetchLocations } = useLocations();

    useClickOutside(ref, handleClickOutside);

    const [locationOnEdit, setLocationOnEdit] = useState(null);
    const [value, setValue] = useState('');

    const handleAddLocation = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target.form);

        LocationService.createLocation(formData).then(res => {
            if (res?.status === 200) {
                 fetchLocations();
                 setValue('');
            }
        });
    }

    const handleEditLocation = (e: MouseEvent<HTMLButtonElement>, id, name) => {
        e.preventDefault();

        setLocationOnEdit({ id, name });
    }

    const handleDeleteLocation = (id, e) => {
        e.preventDefault();

        LocationService.deleteLocation(id).then(res => res?.status === 200 && fetchLocations());
    }

    function handleClickOutside() {
        if (locations.some(location => location._id === locationOnEdit.id
            && location.name === locationOnEdit.name)
        ) {
            setLocationOnEdit(null);

            return;
        }

        LocationService.updateLocation(
            locationOnEdit.id,
            locationOnEdit.name,
        ).then(res => {
            if (res?.status === 200) {
                fetchLocations().then(() => setLocationOnEdit(null));
            }
        });
    }

    const handleChange = (value) => {
        setLocationOnEdit(prev => ({ ...prev, name: value }))
    }

    return (
        <PageGridLayout>
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
                    {locations.map(location => (
                        <div key={location._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {location._id === locationOnEdit?.id
                                ? (
                                    <Input
                                        ref={ref}
                                        label={'name'}
                                        name={'name'}
                                        initialValue={location.name}
                                        onChange={handleChange}
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
        </PageGridLayout>
    );
}

export default AdminPage;

