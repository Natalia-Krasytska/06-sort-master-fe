import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import type {Item} from "../common/types/Item.ts";
import type Container from "../common/types/Container.ts";



const ItemDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [container, setContainer] = useState<Container | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function fetchItem() {
        try {
            const res = await fetch(`/api/items/${id}`);
            const data = await res.json();
            setItem(data);
        } catch (err) {
            console.error(err);
            setMessage("Error loading item details.");
        }
    }

    async function fetchContainer(containerId: string) {
        try {
            const res = await fetch(`/api/containers/${containerId}`);
            const data = await res.json();
            setContainer(data);
        } catch (err) {
            console.error(err);
            setMessage("Error loading container details.");
        }
    }

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    useEffect(() => {
        if (item?.containerId) {
            fetchContainer(item.containerId);
        }
    }, [item]);

    if (!item) {
        return <div>Loading item details not jet ready</div>;
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Item Details</h2>
            {message ? <p className="text-red-500">{message}</p> : null}
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            {container ? (
                <div className="mt-4 p-4 border rounded" style={{ backgroundColor: container.color }}>
                    <h3 className="font-semibold">Container Info:</h3>
                    <p><strong>Name:</strong> {container.name}</p>
                    <p><strong>Description:</strong> {container.description}</p>
                </div>
            ) : (
                <p>Loading container info</p>
            )}


        </div>
    );
};

export default ItemDetail;