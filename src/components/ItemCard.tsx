import type { Item } from "../common/types/Item.ts";


interface Props {
    item: Item;
    containerColor: string;
}

const ItemsCard = ({ item, containerColor  }: Props) => {
    return (
        <li
            className="p-2 rounded text-black text-center mb-2"
            style = {{backgroundColor: containerColor}}

        >
            <p className="text-black">Item name : {item.name}</p>
            <p className="text-black">Container ID: {item.containerId}</p>
        </li>
    );
};

export default ItemsCard;
