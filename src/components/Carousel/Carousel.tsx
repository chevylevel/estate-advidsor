import { FC, UIEvent, useCallback, useRef, useState } from 'react';

import carousel from './Carousel.module.css';
import Dots from './Dots';
import ArrowLeftIcon from '../../../public/images/arrowLeft.svg';
import ArrowRightIcon from '../../../public/images/arrowRight.svg';
import ImageIcon from '../../../public/images/image.svg';

export type CarouselPropsType = {
    widthDots?: boolean;
    images: {
        url: string,
        id: string,
    }[];
}

const Carousel: FC<CarouselPropsType> = ({
    widthDots = false,
    images = [],
}) => {
    const slidesRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showNavigation, setShowNavigation] = useState(false);

    const onScroll = useCallback(
        (e: UIEvent<HTMLElement>) => {
            const scrollOffset = e.currentTarget.scrollLeft;
            const scrollViewPortWidth = slidesRef.current.clientWidth;

            setCurrentSlide(Math.round(scrollOffset / scrollViewPortWidth));
        },
        [slidesRef.current],
    );

    const handleMouseEnter = useCallback(
        () => {
            if (images.length > 1) {
                setShowNavigation(true)
            }
        },
        [],
    );

    const goToNextSlide = useCallback(
        () => {
            const scrollViewPortWidth = slidesRef.current.clientWidth;
            slidesRef.current.scrollBy({
                left: scrollViewPortWidth,
                behavior: 'smooth',
            });
        },
        [slidesRef.current],
    );

    const goToPreviousSlide = useCallback(
        () => {
            const scrollViewPortWidth = slidesRef.current.clientWidth;
            slidesRef.current.scrollBy({
                left: -scrollViewPortWidth,
                behavior: 'smooth',
            });
        },
        [slidesRef.current],
    );

    return  (
        <div
            className={carousel.content}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setShowNavigation(false)}
        >
            <div
                className={carousel.slides}
                ref={slidesRef}
                onScroll={onScroll}
            >

                {images.length > 0
                    ? images.map(image => (
                        <img
                            key={image.id}
                            className={carousel.image}
                            src={image.url}
                            loading={'lazy'}
                        />
                    ))
                    : (
                        <div className={carousel.blankImage}>
                            <ImageIcon />
                        </div>
                    )
                }
            </div>

            {showNavigation && currentSlide > 0 && (
                <button
                    className={carousel.prevButton}
                    onClick={goToPreviousSlide}
                >
                    <ArrowLeftIcon/>
                </button>
            )}

            {showNavigation && currentSlide < images.length - 1  && (
                <button
                    className={carousel.nextButton}
                    onClick={goToNextSlide}
                >
                    <ArrowRightIcon/>
                </button>
            )}

            {widthDots && images.length > 1 && (
                <Dots
                    className={carousel.pagination}
                    currentSlide={currentSlide}
                    total={images.length}
                />
            )}
        </div>
    )
}

export default Carousel;
