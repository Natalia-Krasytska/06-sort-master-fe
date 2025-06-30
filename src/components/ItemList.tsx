import { useEffect, useState } from "react";
import type { Item } from "../common/types/Item";
import ItemCard from "./ItemCard";

export default function ItemsList() {
    const [items, setItems] = useState<Item[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    async function fetchItems() {
        try {
            const res = await fetch("/api/items");
            const arr = await res.json();

            setItems(arr);
            setMessage(null);
        } catch (err) {
            console.log(err);
            setMessage("Failed to load items");
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div>
            <ul>
                {message ? <p className="text-red-400">{message}</p> : null}
                {items.map((item) => (
                    <ItemCard item={item} />
                ))}Add commentMore actions
            </ul>
        </div>
    );
}