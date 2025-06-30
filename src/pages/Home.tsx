import { useEffect, useState } from "react";
import AdvertList from "../components/AdvertList";
import CreateAdvertForm from "../components/CreateAdvertForm";

interface Result {
    item: string;
    container: {
        id: number;
        name: string;
        color: string;
        description: string;
    };
}

const Home = () => {
    const [filter, setFilter] = useState("");
    const [results, setResults] = useState<Result[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (filter.trim() === "") {
            setResults([]);
            return;
        }
        const timeoutId = setTimeout(() => {
            fetch(`/api/items/search?name=${encodeURIComponent(filter)}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch filtered items");
                    return res.json();
                })
                .then((data) => {
                    setResults(data);
                })
                .catch((err) => setError(err.message)); // Используем err.message
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [filter]);

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Find the Right Container</h2>
            <input
                type="text"
                placeholder="Search item name (e.g. newspaper)..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-6 p-2 w-full border rounded-md"
            />
            {error && <div className="text-red-500">Error: {error}</div>}
            {results.length === 0 && filter.trim() !== "" && (
                <div className="text-gray-500">No matching containers found.</div>
            )}
            <ul className="space-y-4">
                {results.map((result) => (
                    <li
                        key={`${result.item}-${result.container.id}`}
                        className="p-4 rounded-lg shadow-md text-white"
                        style={{ backgroundColor: result.container.color }}
                    >
                        <h3 className="text-xl font-semibold">{result.item}</h3>
                        <p>{result.container.description}</p>
                    </li>
                ))}
            </ul>
            <div className="mt-10">
                <CreateAdvertForm />
            </div>
            <div className="mt-10">
                <AdvertList />
            </div>
        </div>
    );
};

export default Home;
