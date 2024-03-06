import { ChangeEvent, FC, useState } from 'react';
import { Input } from '../../Input/Input';
import { Realty } from '~/src/models/Realty';

interface ConstructionDeadlineFieldPropsType {
    initialRealty: Realty;
};

const ConstructionDeadlineField:FC<ConstructionDeadlineFieldPropsType> = ({
    initialRealty,
}) => {
    const [quarter, setQuarter] = useState(initialRealty?.constructionDeadlineQuarter);
    const [year, setYear] = useState(initialRealty?.constructionDeadlineYear);

    const handleChangeQuarter = (e: ChangeEvent<HTMLSelectElement>) => {
        setQuarter(parseInt(e.currentTarget.value));
    }

    const handleChangeYear = (value) => {
        setYear(value);
    }

    return(
        <div style={{ marginTop: '40px' }}>
            Срок сдачи
            <div style={{display: 'flex', alignItems: 'center' }}>
                <Input
                    style={{ alignSelf: 'end', width: '50%'}}
                    label={'year'}
                    name={'constructionDeadlineYear'}
                    onChange={handleChangeYear}
                    initialValue={initialRealty?.constructionDeadlineYear}
                />

                <div style={{ width: '50%'}}>
                    <label
                        htmlFor='quarter-select'
                        style={{ marginRight: '10px', fontSize: 'small' }}
                    >
                        quarter
                    </label>

                    <select
                        id='quarter-select'
                        name={'constructionDeadlineQuarter'}
                        style={{ padding: '5px'}}
                        value={quarter}
                        onChange={handleChangeQuarter}
                        disabled={!year}
                    >
                        <option value={1}>Q1</option>
                        <option value={2}>Q2</option>
                        <option value={3}>Q3</option>
                        <option value={4}>Q4</option>
                    </select>
                </div>
            </div>
    </div>
    );
}

export default ConstructionDeadlineField;
