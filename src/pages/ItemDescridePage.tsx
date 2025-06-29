import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Item } from "../common/types/Item";
import type Container from "../common/types/Container";

export default function ItemDescridePage() {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [container, setContainer] = useState<Container | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/items/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load item");
                return res.json();
            })
            .then((data) => {
                setItem(data);
                return fetch(`/api/containers/${data.containerId}`);
            })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load container");
                return res.json();
            })
            .then((containerData) => setContainer(containerData))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!item) return <div>Loading...</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Item Describe</h1>
            <div className="bg-white shadow-md rounded p-4">
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Container ID:</strong> {item.containerId}</p>
                {container && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Container Information</h2>
                        <p><strong>Name:</strong> {container.name}</p>
                        <p><strong>Description:</strong> {container.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
