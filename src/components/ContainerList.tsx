import React, { useEffect, useState } from "react";
import type Container from "../common/types/Container";
import ContainerCard from "./ContainerCard";

const ContainerList = () => {
    const [containers, setContainers] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(setContainers)
            .catch(setError);
    }, []);

    const handleDelete = (id) => {
        fetch(`/api/containers/${id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete container");
                setContainers(containers.filter(container => container.id !== id));
                setMessage("Контейнер успешно удалён.");
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    if (error) return <div className="text-red-500">Error loading containers.</div>;
    if (message) return <div className="text-green-500">{message}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            <ul className="space-y-4">
                {containers.map((container) => (
                    <ContainerCard key={container.id} container={container} onDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;
