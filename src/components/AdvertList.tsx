import React, { useEffect, useState } from 'react';
import type Advert from '../common/types/Advert';
import AdvertCard from './AdvertCard';

interface AdvertWithId extends Advert {
    id: string;
}

const AdvertList: React.FC = () => {
    const [adverts, setAdverts] = useState<AdvertWithId[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/adverts')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch adverts');
                return res.json();
            })
            .then((data) => setAdverts(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="space-y-4">
            {adverts.map((advert, index) => (
                <AdvertCard key={advert.id || index} advert={advert} />
            ))}
        </div>
    );
};

export default AdvertList;
