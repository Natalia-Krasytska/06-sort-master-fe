import React, { useEffect, useState } from "react";

interface Container {
    id: string;
    color: string;
    name: string;
    description: string;
}

const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [itemInputs, setItemInputs] = useState<{ [key: string]: string }>({});
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/containers")
            .then((res) => {
                if (!res.ok) {
                    setError("Network response was not ok");
                    return;
                }
                return res.json();
            })
            .then((data) => setContainers(data))
            .catch(() => setError("Failed to load containers"));
    }, []);

    const handleInputChange = (containerId: string, value: string) => {
        setItemInputs({ ...itemInputs, [containerId]: value });
    };

    const handleAddItem = async (containerId: string) => {
        const name = itemInputs[containerId];
        if (!name) return;

        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                containerId: containerId,
            }),
        });

        if (response.ok) {
            setMessage(`Item added to container ${containerId}!`);
            setItemInputs({ ...itemInputs, [containerId]: "" });
        } else {
            setMessage("Error adding item.");
        }
    };

    const handleRemoveContainer = async (containerId: string) => {
        const response = await fetch(`/api/containers/${containerId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setContainers(containers.filter((container) => container.id !== containerId));
            setMessage(`Container ${containerId} removed.`);
        } else {
            setMessage("Error removing container.");
        }
    };

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
            {message && <div className="mb-4 text-green-600">{message}</div>}
            <ul className="space-y-6">
                {containers.map((container) => (
                    <li
                        key={container.id}
                        className="p-4 rounded-lg shadow-md text-white"
                        style={{ backgroundColor: container.color }}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">{container.name}</h3>
                                <p>{container.description}</p>
                            </div>
                            <button
                                onClick={() => handleRemoveContainer(container.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                        <div className="mt-4 space-y-2">
                            <input
                                type="text"
                                placeholder="New item name"
                                className="p-2 rounded border-2 border-gray-800 text-black w-full"
                                value={itemInputs[container.id] || ""}
                                onChange={(e) => handleInputChange(container.id, e.target.value)}
                            />
                            <button
                                onClick={() => handleAddItem(container.id)}
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
                            >
                                Add Item
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContainerList;

