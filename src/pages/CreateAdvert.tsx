import React from 'react';
import CreateAdvertForm from '../components/CreateAdvertForm';

const CreateAdvert: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create Advert</h1>
            <CreateAdvertForm />
        </div>
    );
};

export default CreateAdvert;
