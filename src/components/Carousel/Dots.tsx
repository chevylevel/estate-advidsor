import classNames from 'classnames';
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import usePrevious from './usePrevious';
import dots from './Dots.module.css';

export type DotsPropsType = {
    className?: string;
    total: number
    currentSlide: number;
}

const Scale = {
    NORMAL: 1,
    MEDIUM: .8,
    SMALL: .6,
};

const Dots: FC<DotsPropsType> = ({
    total,
    currentSlide = 0,
    className,
}) => {
    const VISIBLE_COUNT =  total > 5 ? 5 : total;
    const EDGE_INDEX = Math.floor(VISIBLE_COUNT / 2);
    const TRANSLATE_STEP = 14;
    const END_INDEX = total - 1;
    const DOT_SIZE = 7;

    const cn = classNames(className, dots.content);
    const prevSlide = usePrevious(currentSlide) || 0;

    const [translate, setTranslate] = useState(0);

    const getDotScale = useCallback(
        (index) => {
            const isStart = currentSlide <= EDGE_INDEX;
            const isEnd = currentSlide >= END_INDEX - EDGE_INDEX;
            let scale = Scale.NORMAL;

            if (total <= VISIBLE_COUNT) {
                return scale;
            }

            if (isStart && index === VISIBLE_COUNT - 1
                || isEnd && index === END_INDEX + 1 - VISIBLE_COUNT
            ) {
                scale = Scale.SMALL;
            }

            if (isStart && index === EDGE_INDEX + 1
                || isEnd && index === END_INDEX - EDGE_INDEX - 1
            ) {
                scale = Scale.MEDIUM;
            }

            if (!isStart && !isEnd
                && (index === currentSlide - EDGE_INDEX
                    || index === currentSlide + EDGE_INDEX)
            ) {
                scale = Scale.MEDIUM;
            }

            return scale;
        },
        [currentSlide]
    );

    const dotElements = useMemo(
        () => Array(total).fill(null).map((_, index) => {
            const className = classNames(dots.dot, {
                [dots.currentDot]: index === currentSlide,

            });

            return (
                <div
                    key={index}
                    className={className}
                    style={{
                        transform: `translateX(${translate}px) scale(${getDotScale(index)})`,
                        width: `${DOT_SIZE}px`,
                    }}
                >
                </div>
            );
        }),
        [
            total,
            currentSlide,
            translate,
        ],
    );

    useEffect(() => {
        if (currentSlide > prevSlide
            && currentSlide > EDGE_INDEX
            && currentSlide <= END_INDEX - EDGE_INDEX
        ) {
            setTranslate(prev => prev - TRANSLATE_STEP);
        }

        if (currentSlide < prevSlide
            && currentSlide < END_INDEX - EDGE_INDEX
            && currentSlide >= EDGE_INDEX
        ) {
            setTranslate(prev => prev + TRANSLATE_STEP);
        }
    }, [currentSlide]);

    return  (
        <div
            className={cn}
            style={{ width: `${VISIBLE_COUNT * DOT_SIZE * 2 - DOT_SIZE}px` }}
        >
            {dotElements}
        </div>
    );
}

export default Dots;
