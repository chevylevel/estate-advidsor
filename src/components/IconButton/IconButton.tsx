import  { useRef, type FC, type MouseEvent, type ReactNode, useEffect, useState } from 'react';

import iconButton from './IconButton.module.css';
import classNames from 'classnames';

interface IconButtonPropsType {
    id?: string;
    children: ReactNode;
    theme?: 'dark' | 'light';
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const IconButton: FC<IconButtonPropsType> = ({
    id = '',
    children,
    theme = 'dark',
    onClick,
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const [buttonSize, setButtonSize] = useState(0);

    useEffect(
        () => {
            if (ref.current) {
                setButtonSize(ref.current.clientHeight);
            }
        },
        [ref.current],
    )

    return (
        <button
            id={id}
            ref={ref}
            className={iconButton.content}
            onClick={onClick}
        >
            {children}

            <div
                className={classNames(iconButton.substrate, iconButton[theme])}
                style={{width: `${buttonSize}px`, height: `${buttonSize}px`}}
            ></div>
        </button>
    );
}
