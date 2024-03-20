import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Realty } from '~/src/models/Realty';
import realtyStyles from './Realty.module.css';
import classNames from 'classnames';
import ImageGallery from './ImageGallery/ImageGallery';
import Header from '~/src/components/Header/Header';
import RealtyDetail from './RealtyDetail/RealtyDetail';
import HeartIcon from '~/public/images/heart.svg';

interface RealtyPropsType {
    realty: Realty;
}

const Realty: FC<RealtyPropsType> = ({
    realty,
}) => {
    return (
        <div className={realtyStyles.content}>
        <Typography
        variant={'h4'}
        gutterBottom
        >
        {realty.name}
        </Typography>

        {realty.images.length > 0
            ? (
                <div className={realtyStyles.gallery}>
                    <ImageGallery images={realty.images}/>
                </div>

            )
            : null
        }

        <div className={realtyStyles.data}>
            <div className={realtyStyles.left}>
            <Typography
                variant={'h5'}
                gutterBottom
            >
                {realty.location}
            </Typography>

            <div className={realtyStyles.props}>
                <span>{realty.type}</span>

                &nbsp;
                •
                &nbsp;

                <span>{realty.bedrooms} bedrooms</span>

                {realty.withView && (
                    <>
                        &nbsp;
                        •
                        &nbsp;

                        <span>with view</span>
                    </>
                )}

                <button className={realtyStyles.saveButton}>
                    <Typography
                        variant={'button'}
                        sx={{textDecoration: 'underline'}}
                    >
                        Save
                    </Typography>
                    &nbsp;
                    <HeartIcon />
                </button>
            </div>

            <Divider
                sx={{margin: '40px 40px 0 0'}}
            />

            <div className={realtyStyles.block}>
                <Typography
                    variant={'h5'}
                    gutterBottom
                >
                    Property details
                </Typography>

                <RealtyDetail
                    name={'Construction deadline'}
                    value={realty.constructionDeadlineYear
                        ? `${realty.constructionDeadlineYear} ${realty.constructionDeadlineQuarter}`
                        : 'finished'
                    }
                />

                <RealtyDetail
                    name={'Land square'}
                    range={[realty.landSquareMin, realty.landSquareMax]}
                    unit={'m²'}
                />

                <RealtyDetail
                    name={'Living space'}
                    range={[realty.squareMin, realty.squareMax]}
                    unit={'m²'}
                />

                <RealtyDetail
                    name={'Ownership'}
                    value={realty.ownership + (!!realty.ownershipPeriod
                            ? `${realty.ownershipPeriod} years` : ''
                    )}
                />

                {realty.isPossibleToStay && (
                    <Typography
                        variant={'subtitle2'}
                        gutterBottom
                    >
                        It is possible to stay for owner
                    </Typography>
                )}
            </div>

            <Divider
                sx={{margin: '40px 40px 40px 0'}}
            />

            <Typography
                variant={'body1'}
                gutterBottom
                sx={{marginRight: '40px'}}
            >
                {realty.description}
            </Typography>
        </div>

        <div style={{flexShrink: 0}}>
            <Paper
                sx={{borderRadius: '12px'}}
                className={realtyStyles.price}
                elevation={3}
            >
                <RealtyDetail
                    name={'Price'}
                    range={[realty.priceMin, realty.priceMax]}
                    unit={'$'}
                />

                <RealtyDetail
                    name={'Monthly income'}
                    range={[
                        Math.ceil(realty.priceMin * realty.roiRent / 100 / 12),
                        Math.ceil(realty.priceMax * realty.roiRent / 100 / 12)
                    ]}
                    unit={'$'}
                />

                {realty.withInstallment && (
                    <Typography
                        variant={'subtitle2'}
                        gutterBottom
                    >
                        installment available
                    </Typography>
                )}
            </Paper>

            <div className={classNames(
                realtyStyles.block,
                realtyStyles.outlinedBlock
            )}>
                <div className={realtyStyles.roi}>
                    <Typography
                        variant={'caption'}
                        display={'block'}
                        gutterBottom
                    >
                        rent ROI
                    </Typography>

                    <Typography
                        variant={'body1'}
                        gutterBottom
                    >
                        {`${realty.roiRent} %`}
                    </Typography>
                </div>

                <div className={realtyStyles.roi}>
                    <Typography
                        variant={'caption'}
                        display={'block'}
                        gutterBottom
                    >
                        sale ROI
                    </Typography>

                    <Typography
                        variant={'body1'}
                        gutterBottom
                    >
                        {`${realty.roiSale} %`}
                    </Typography>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Realty;
