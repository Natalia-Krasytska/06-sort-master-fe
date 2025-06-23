import React, { useEffect, useState } from "react";
import ContainerCard from "./ContainerCard";
import type Container from "../common/types/Container";

const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => setContainers(data))
            .catch((err) => setError(err.message));
    }, []);

    const handleDelete = (id: string) => {
        fetch(`/api/containers/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete container");
                setContainers((prevContainers) =>
                    prevContainers.filter((container) => container.id !== id)
                );
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    if (error) return <div className="text-red-500">Error loading containers.</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            <ul className="space-y-4">
                {containers.map((container) => (
                    <ContainerCard
                        key={container.id}
                        container={container}
                        onDelete={() => handleDelete(container.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;
