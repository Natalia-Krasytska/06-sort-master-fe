import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type Advert from '../common/types/Advert';

interface AdvertContextType {
    adverts: Advert[];
    addAdvert: (advert: Advert) => void;
}

const AdvertContext = createContext<AdvertContextType | undefined>(undefined);

interface AdvertProviderProps {
    children: ReactNode;
}

const AdvertProvider: React.FC<AdvertProviderProps> = ({ children }) => {
    const [adverts, setAdverts] = useState<Advert[]>([
        {
            id: '1',
            title: 'Recycling Initiative',
            description: 'Join our initiative to promote recycling and reduce waste.',
            photo: 'image1',
        },
        {
            id: '2',
            title: 'Sustainable Living',
            description: 'Learn how to live sustainably and make a difference.',
            photo: 'image2',
        },
        {
            id: '3',
            title: 'Eco-Friendly Products',
            description: 'Discover our range of eco-friendly products for a greener lifestyle.',
            photo: 'image3',
        },
        {
            id: '4',
            title: 'Green Energy Solutions',
            description: 'Explore our green energy solutions for a sustainable future.',
            photo: 'image4',
        },
        {
            id: '5',
            title: 'Waste Sorting Guide',
            description: 'A comprehensive guide to sorting waste effectively.',
            photo: 'image5',
        },
        {
            id: '6',
            title: 'Community Cleanup',
            description: 'Participate in our community cleanup events.',
            photo: 'image6',
        },
        {
            id: '7',
            title: 'Recycle Today',
            description: 'Start recycling today for a better tomorrow.',
            photo: 'image7',
        },
        {
            id: '8',
            title: 'Green Revolution',
            description: 'Join the green revolution and sort your waste!',
            photo: 'image8',
        },
    ]);

    const addAdvert = (advert: Advert) => {
        setAdverts((prevAdverts) => [...prevAdverts, advert]);
    };

    return (
        <AdvertContext.Provider value={{ adverts, addAdvert }}>
            {children}
        </AdvertContext.Provider>
    );
};

const useAdvertContext = (): AdvertContextType => {
    const context = useContext(AdvertContext);
    if (context === undefined) {
        throw new Error('useAdvertContext must be used within an AdvertProvider');
    }
    return context;
};

export { AdvertProvider, useAdvertContext };
