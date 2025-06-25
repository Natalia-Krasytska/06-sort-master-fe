import type Container from "../common/types/Container.ts";
import type {ReactNode} from "react";

interface Props {
    container: Container;
    children: ReactNode;
}
export default function ContainerCard({container, children}: Props){
    return (
        <div
            className="relative p-4 rounded-lg shadow-md text-white"
            style={{backgroundColor: container.color}}
        >
            <h3 className="text-xl font-semibold">{container.name}</h3>
            <p>{container.description}</p>

            {children && <div className="mt-4">{children}</div>}
        </div>
    );
}


