import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layouts/Layout";
import Containers from "./pages/Containers";
import CreateContainerForm from "./components/CreateContainerForm";
import Items from "./pages/Items";
import ItemPage from "./pages/ItemPage";
import CreateAdvert from "./pages/CreateAdvert";
import Advert from "./pages/Advert";

function App() {
    return (
        <div>
            <nav></nav>
            <Layout>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/containers" element={<Containers />} />
                    <Route path="/container-form" element={<CreateContainerForm />} />
                    <Route path="/items" element={<Items />} />
                    <Route path="/items/:id" element={<ItemPage />} />
                    <Route path="/advert" element={<Advert />} />
                    <Route path="/create-advert" element={<CreateAdvert />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
