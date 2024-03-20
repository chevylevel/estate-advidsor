import { FC } from 'react';
import classNames from 'classnames';

import imageGalleryStyles from './ImageGallery.module.css';

interface RealtyPropsType {
    images: {
        url: string;
        id: string;
    }[];
}

const ImageGallery: FC<RealtyPropsType> = ({
    images,
}) => {
    const sideImages = images.slice(1, 5);
    const mainImage = images[0];

    const handleClickImage = (id) => {
        console.log(id);
    }

    return (
        <div className={imageGalleryStyles.content}>
            <div className={imageGalleryStyles.mainImageContainer}>
                <button
                    className={imageGalleryStyles.imageButton}
                    onClick={() => handleClickImage(mainImage.id)}
                >
                    <img
                        className={imageGalleryStyles.image}
                        src={`${mainImage?.url}`}
                    />
                </button>
            </div>

            <div className={imageGalleryStyles.sideImageContainer}>
                {sideImages.map(image => (
                    <div className={imageGalleryStyles.sideImageButtonContainer}>
                        <button
                            className={imageGalleryStyles.imageButton}
                            onClick={() => handleClickImage(image.id)}
                        >
                            <img
                                className={classNames(
                                    imageGalleryStyles.image,
                                    imageGalleryStyles.sideImage,
                                )}
                                src={`${image?.url}`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
