import type {Item} from "../common/types/Item";
import {Link} from "react-router-dom";

interface Props {
    item: Item;
}

export default function ItemCard({item}: Props) {
    return (
        <li key={item.id} className="bg-amber-200 rounded-2xl p-2 m-2">
            Name: {item.name} Container Id: {item.containerId}

            <Link to={`/items/${item.id}`}
                  className="text-blue-600 hover:underline"
            >To item page
            </Link>
        </li>
    );
}