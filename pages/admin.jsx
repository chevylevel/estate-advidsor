import { Input } from '../src/components/Input/Input';

const AdminPage = () => {
    const handleClickSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch('http://localhost:4000/api/realties', {
                method: 'POST',
                body: new FormData(e.target.form),
            });
        } catch (error) {
            console.log(error.message, 'error');
        }
    }

    return (
        <div style={{ marginLeft: '50px' }}>
            <form id='realty'>
                <div style={{
                    marginTop: '50px',
                    marginBottom: '50px',
                    maxWidth: '400px',
                }}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label for='type-select' style={{marginRight: '10px', fontSize: 'x-small'}}>
                            Тип
                        </label>

                        <select id='type-select' name={'variant'}>
                            <option value="apartment">apartment</option>
                            <option value="penthouse">penthouse</option>
                            <option value="villa">villa</option>
                        </select>
                    </div>

                    <div style={{marginTop: '10px', fontSize: 'small'}}>
                        Площадь

                        <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                            <Input labelText={'от'} name={'squareMin'} required />
                            <Input labelText={'до'} name={'squareMax'} required />
                        </div>
                    </div>

                    <div style={{marginTop: '10px', fontSize: 'small'}}>
                        Стоимость

                        <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                            <Input labelText={'от'} name={'priceMin'} required />
                            <Input labelText={'до'} name={'priceMax'} required />
                        </div>
                    </div>
                    <div style={{marginTop: '10px', fontSize: 'small'}}>
                        ROI

                        <div style={{ marginTop: '10px', display: 'flex', justifyContent:'space-between' }}>
                            <Input labelText={'ROI Sale'} name={'roiSale'} required />
                            <Input labelText={'ROI Rent'} name={'roiRent'} required />
                        </div>
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Количество спален'} name={'bedrooms'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'площадь участка'} name={'landSquare'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Локация'} name={'location'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Заполняемость'} name={'occupancy'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Расстояние до пляжа'} name={'beachDistance'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Возможность проживания'} name={'livingPossibility'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Стадия строительства'} name={'constructionStatus'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'Описание'} name={'description'} />
                    </div>

                    <div style={{marginTop: '40px'}}>
                        <Input labelText={'картинка'} name={'picture'} type={'file'} />
                    </div>
                </div>

                <button type='submit' onClick={handleClickSubmit}>Отправить</button>
            </form>
        </div>
    );
}

export default AdminPage;
