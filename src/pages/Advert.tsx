import React from 'react';
import AdvertList from '../components/AdvertList';

const Adverts: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Adverts</h1>
            <AdvertList />
        </div>
    );
};

export default Adverts;
