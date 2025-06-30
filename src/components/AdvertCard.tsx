import React from 'react';
import type Advert from '../common/types/Advert';

interface Props {
    advert: Advert;
}

const AdvertCard: React.FC<Props> = ({ advert }) => {
    return (
        <div className="p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{advert.title}</h3>
            <p className="text-gray-700">{advert.description}</p>
            {advert.photo && <img src={advert.photo} alt={advert.title} className="mt-2 rounded" />}
        </div>
    );
};

export default AdvertCard;
