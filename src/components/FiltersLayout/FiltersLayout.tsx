import {
    useEffect,
    useState,
    FC,
    ReactNode,
    useRef,
} from 'react';

import filtersLayoutStyles from './FiltersLayout.module.css';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';

type FilterPropsType = {
    children: ReactNode;
};

const FiltersLayout: FC<FilterPropsType> = ({
    children,
}) => {
    const { ref: inViewRefTop, inView: inViewTop } = useInView();
    const { ref: inViewRefBottom, inView: inViewBottom } = useInView();
    const ref = useRef<HTMLDivElement>(null)

    const [isOpenFilters, setOpenFilters] = useState(false);
    const [isShowControl, setShowControl] = useState(false);

    useEffect(
        () => {
            if (inViewTop) {
                setOpenFilters(false);
            }

            if (!isOpenFilters) {
                setShowControl(!inViewBottom);
            } else {
                setShowControl(!inViewTop);
            }
        },
        [inViewTop, inViewBottom],
    );

    return (
        <>
            <div ref={inViewRefTop} style={{
                 gridColumn: '1 / last-line',
            }}></div>

            <div
                className={classNames(filtersLayoutStyles.content, {
                    [filtersLayoutStyles.open]: isOpenFilters,
                })}
                // ref={ref}
                // style={{ top: `-${ref.current?.clientHeight}px`}}
            >

                {children}

                {(isShowControl &&
                    <div className={classNames(filtersLayoutStyles.showControl, {
                        [filtersLayoutStyles.showControlOpen] : isOpenFilters
                    })}>
                        <button
                            onClick={() => {
                                setOpenFilters((prev)=> !prev);
                                if (inViewBottom) {
                                    setShowControl(false);
                                }
                            }}
                        >
                            фильтры, {isOpenFilters? 1 : 0}
                        </button>
                    </div>
                )}
            </div>

            <div ref={inViewRefBottom} style={{
                 gridColumn: '1 / last-line',
            }}></div>
        </>
    );
}

export default FiltersLayout;
