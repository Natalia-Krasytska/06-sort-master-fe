import React from 'react';
import image1 from '../assets/img1.jpg';
import image2 from '../assets/img2.jpg';
import image3 from '../assets/img3.jpg';
import image4 from '../assets/img4.jpg';
import image5 from '../assets/img5.jpg';
import image6 from '../assets/img6.jpg';
import image7 from '../assets/img7.jpg';
import image8 from '../assets/img8.jpg';
import type Advert from '../common/types/Advert';

interface Props {
    advert: Advert;
}

const AdvertCard: React.FC<Props> = ({ advert }) => {
    const imageMap = {
        image1, image2, image3, image4, image5, image6, image7, image8,
    };

    const imageToUse = imageMap[advert.photo as keyof typeof imageMap] || image1;

    return (
        <div className="p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{advert.title}</h3>
            <p className="text-gray-700">{advert.description}</p>
            <img src={imageToUse} alt={advert.title} className="mt-2 rounded" />
        </div>
    );
};

export default AdvertCard;
