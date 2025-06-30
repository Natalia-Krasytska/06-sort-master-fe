import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Item } from "../common/types/Item";

export default function ItemPage() {
    const { id } = useParams();
    const [item, setItem] = useState<Item | undefined>(undefined);

    async function fetchItem(id: string | undefined) {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) {
            throw new Error("Failed to load item");
        }
        const itemRes = await res.json();
        setItem(itemRes);
    }

    useEffect(() => {
        fetchItem(id);
    }, [id]);

    return <div>Item: {item?.name}</div>;
}