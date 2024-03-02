import type  { FC, ReactNode } from 'react';

import search from './search.module.css';

import SearchIcon from '../../../public/images/search.svg';
import { IconButton } from '../IconButton/IconButton';

interface SearchPropsType {
    children?: ReactNode
}

const Search: FC<SearchPropsType> = ({children}) => {
    const handleClickSearch = () => {
        console.log('search');
    };

    return (
        <div className={search.content}>
            <div className={search.inputLabel}>
                введите желаемые параметры:
            </div>
            <div style={{ display: 'flex' }}>
                <textarea
                    className={search.inputField}
                    placeholder={'Вилла в 200 метрах от океана, на две спальни, стоимостью до $150000, в Чангу'}
                    onChange={() => {}}
                />

                <IconButton
                    theme='light'
                    onClick={handleClickSearch}
                >
                    <SearchIcon className={search.icon}/>
                </IconButton>
            </div>
        </div>
    );
}

export default Search;
