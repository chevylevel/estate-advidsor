import developerCard from './DeveloperCard.module.css';

export const DeveloperCard = ({
    name,
    price,
    location,
    square,
    isConstructionFinish,
}) => {
    return (
        <div
            className={developerCard.content}
            name={name}
            price={price}
            location={location}
            square={square}
            isConstructionFinish={isConstructionFinish}
        >
            <h3>{ name }</h3>
            <div>Цены: { price }</div>
            <div>Расположение: { location }</div>
            <div>Площадь: { square }</div>
            <div>Срок завершения строительства: { isConstructionFinish }</div>
        </div>
    );
}
