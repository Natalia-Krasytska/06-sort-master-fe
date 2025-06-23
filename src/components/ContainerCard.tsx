
import type Container from "../common/types/Container";
import CreateItemForm from "./CreateItemForm";

interface ContainerCardProps {
    container: Container;
    onDelete: () => void;
}

const ContainerCard = ({ container, onDelete }: ContainerCardProps) => {
    return (
        <li
            className="p-4 rounded-lg shadow-md text-white relative"
            style={{ backgroundColor: container.color }}
        >
            <button
                onClick={onDelete}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
                Remove
            </button>
            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>
            <CreateItemForm containerId={container.id} />
        </li>
    );
};

export default ContainerCard;
