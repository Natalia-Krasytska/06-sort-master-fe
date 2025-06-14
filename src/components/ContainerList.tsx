import React, { useEffect, useState } from "react";

interface Container {
    id: string;
    color: string;
    name: string;
    description: string;
}

interface Item {
    id: string;
    name: string;
    containerId: string;
}

const ContainerList = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"containers" | "items">("containers");
    const [itemInputs, setItemInputs] = useState<Record<string, string>>({});

    const fetchData = async <T,>(url: string, setter: React.Dispatch<React.SetStateAction<T>>) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Network response was not ok");
            const data: T = await res.json();
            setter(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    };

    const handleAction = async <T,>(
        url: string,
        method: string,
        body?: T,
        successMessage: string = ""
    ) => {
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!res.ok) throw new Error(`Failed to ${method === "POST" ? "add" : "delete"}`);

            setMessage(successMessage);

            if (method === "POST") {
                await fetchData<Item[]>("/api/items", setItems);
            }
        } catch (err) {
            setError(`Error ${method === "POST" ? "adding item" : "removing container"}.`);
        }
    };

    const handleInputChange = (containerId: string, value: string) => {
        setItemInputs(prev => ({ ...prev, [containerId]: value }));
    };

    const handleAddItem = (containerId: string) => {
        const itemName = itemInputs[containerId];
        if (!itemName) return;
        handleAction<{ name: string; containerId: string }>(
            "/api/items",
            "POST",
            { name: itemName, containerId },
            `Item added to container ${containerId}!`
        );
        setItemInputs(prev => ({ ...prev, [containerId]: "" }));
    };

    const handleRemoveContainer = (containerId: string) => {
        handleAction(
            `/api/containers/${containerId}`,
            "DELETE",
            undefined,
            `Container ${containerId} removed.`
        );
        setContainers(prev => prev.filter(container => container.id !== containerId));
    };

    useEffect(() => {
        fetchData<Container[]>("/api/containers", setContainers);
        fetchData<Item[]>("/api/items", setItems);
    }, []);

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="flex mb-4">
                {(["containers", "items"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {message && <div className="mb-4 text-green-600">{message}</div>}

            {activeTab === "containers" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>
                    <ul className="space-y-4">
                        {containers.map(container => (
                            <li key={container.id} className="p-4 rounded-lg shadow-md text-white relative" style={{ backgroundColor: container.color }}>
                                <button onClick={() => handleRemoveContainer(container.id)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Remove</button>
                                <h3 className="text-xl font-semibold">{container.name}</h3>
                                <p>{container.description}</p>
                                <div className="mt-4">
                                    <input type="text" placeholder="New item name" className="p-2 rounded text-black w-full" value={itemInputs[container.id] || ""} onChange={(e) => handleInputChange(container.id, e.target.value)} />
                                    <button onClick={() => handleAddItem(container.id)} className="mt-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Add Item</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeTab === "items" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Items</h2>
                    <ul className="space-y-4">
                        {items.map(item => (
                            <li key={item.id} className="p-4 rounded-lg shadow-md bg-gray-100">
                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                <p>Container ID: {item.containerId}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ContainerList;
