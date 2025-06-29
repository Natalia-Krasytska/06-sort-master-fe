import  {useEffect, useState} from 'react';
import type {Item} from "../common/types/Item.ts";
import type Container from "../common/types/Container.ts";
import {Link} from "react-router-dom";
import ItemsCard from "./ItemCard.tsx";


const ItemsList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [containers, setContainers] = useState<Container[]>([]);


    async function fetchItems() {
        try {
            const res = await fetch("/api/items");
            const arr = await res.json();
            setItems(arr);
            setMessage(null)
        } catch (err) {
            console.error(err);
            setMessage("Failed to load items.");
        }
    }
    async function fetchContainers() {

        try {
            const res = await fetch("/api/containers");
            const arr = await res.json();
            setContainers(arr);
        } catch (err) {
            console.error(err);
            setMessage("Failed to load containers.");
        }

    }

    useEffect(() => {
        fetchItems().then(()=> fetchContainers());
    }, []);

    const containerMap = new Map(containers.map((c) => [c.id, c]));
    return (

        <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Items list</h2>
            {message ? <p className="text-red-500">{message}</p> : null}
            <ul>
                {items.map((item )=> {
                    const container= containerMap.get(item.containerId);


                    return (
                        <Link key={item.id} to={`/items/${item.id}`}>
                            <ItemsCard  key={item.id} item={item}  containerColor = {container?.color || "white"}/>
                        </Link>
                    );})
                }
            </ul>

        </div>


    );
};

export default ItemsList;

