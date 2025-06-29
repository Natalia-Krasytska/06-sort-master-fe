import type Container from "../common/types/Container.ts";
import CreateItemForm from "./CreateItemForm";


interface Props {
    container: Container;
}
export default function ContainerCard({ container }: Props) {
    return (
        <li
            key={container.id}
            className="p-4 rounded-lg shadow-md text-white"
            style={{ backgroundColor: container.color }}
        >
            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>

            <CreateItemForm containerId={container.id}/>
        </li>
    );
}
