
export default function About() {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-green-700">
                About Recycling
            </h1>

            <div className="max-w-3xl mx-auto">
                <div className="mb-6 p-6 rounded-lg shadow-md border-l-4 border-green-600 bg-green-50">
                    <p className="text-lg text-gray-800 leading-relaxed">
                        Recycling glass helps to save energy and raw materials.
                        Glass can be recycled endlessly without loss in quality or purity.
                        By recycling glass, we reduce the need for raw materials like sand, soda ash, and limestone, and we also lower the energy required to produce new glass products.
                    </p>
                </div>

                <div className="mb-6 p-6 rounded-lg shadow-md border-l-4 border-blue-600 bg-blue-50">
                    <p className="text-lg text-gray-800 leading-relaxed">
                        Recycling paper is crucial for conserving natural resources and reducing pollution.
                        Recycled paper reduces the need for virgin pulp, thus saving trees and water.
                        It also uses less energy compared to making paper from new raw materials.
                        By recycling paper, we can significantly reduce the environmental impact associated with paper production.
                    </p>
                </div>

                <div className="mb-6 p-6 rounded-lg shadow-md border-l-4 border-yellow-500 bg-yellow-50">
                    <p className="text-lg text-gray-800 leading-relaxed">
                        Recycling plastic plays a key role in reducing environmental pollution.
                        Plastic can be recycled into various products, reducing the need for new plastic production and decreasing landfill waste.
                        Recycling plastic also helps to reduce greenhouse gas emissions and save energy.
                    </p>
                </div>
            </div>
        </div>
    );
}

