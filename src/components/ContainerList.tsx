import type Container from "../common/types/Container.ts";
import ContainerCard from "./ContainerCard.tsx";
import {useEffect, useState} from "react";


interface ItemInputs {
    [containerId: string]: string;
}

const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [itemInputs, setItemInputs] = useState<ItemInputs>({});

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(setContainers)
            .catch((err) => setError(err.message));
    }, []);

    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage(null);
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    const handleAddItem = async (containerId: string) => {
        const name = itemInputs[containerId]?.trim();
        if (!name) return;
        try {
            const res = await fetch("/api/items", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name,
                    containerId,
                }),
            });
            if (!res.ok) throw new Error("Failed to add item");
            setMessage(`Item "${name}" added to container ${containerId}`)
            setItemInputs((prev) => ({...prev, [containerId]: ""}));
        } catch (err) {
            setError((err as Error).message);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/containers/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Network response was not ok");

            setContainers((prev) => prev.filter((container) => container.id !== id));
            setMessage("Container deleted successfully");
        } catch (err) {
            setMessage("Failed to delete container");
        }
    };

    if (error)
        return <div className="text-red-500">Error loading containers.</div>;


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            {message && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
                    {message}
                </div>
            )}
            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded">
                    {error}
                </div>
            )}
            <ul className="space-y-4">
                {containers.map((container: Container) => (
                    <li key={container.id}>
                        <ContainerCard container={container}>
                            <button onClick={() => handleDelete(container.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded">
                                Remove container
                            </button>

                            <input type="text" placeholder="New item name" value={itemInputs[container.id] || ""}
                                   onChange={(e) => setItemInputs((prev) => ({
                                       ...prev,
                                       [container.id]: e.target.value,
                                   }))}
                                   className="w-full mt-2 p-2 text-black rouded border"/>
                            <button onClick={() => handleAddItem(container.id)}
                                    className="mt-2 bg-white text-black px-4 py-1 rounded hover:bg-gray-100">
                                Add Item
                            </button>
                        </ContainerCard>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;


