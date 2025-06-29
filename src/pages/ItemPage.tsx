import { useParams } from "react-router-dom";
import CreateItemForm from "../components/CreateItemForm";

const ItemPage = () => {
    const { containerId } = useParams<{ containerId: string }>();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
            <CreateItemForm containerId={containerId!} />
        </div>
    );
};

export default ItemPage;
