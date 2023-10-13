import list from './List.module.css';

export const List = ({children}) => {
    return (
        <div className={list.content}>
            {children}
        </div>
    );
}
