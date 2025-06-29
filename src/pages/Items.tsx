import {useEffect, useState} from "react";
import ItemCard from "../components/ItemCard.tsx";
import type {Item} from "../common/types/Item.ts";



export default function Items() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/items')
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-center mb-4">
                <h1 className="text-2xl font-bold text-center">Items</h1>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
