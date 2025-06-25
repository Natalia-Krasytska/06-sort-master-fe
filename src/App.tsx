import {Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Containers from "./pages/Containers";
import CreateContainerForm from "./components/CreateContainerForm";
import Items from "./pages/Items.tsx";
import ItemDescridePage from "./pages/ItemDescridePage.tsx";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import ItemPage from "./pages/ItemPage.tsx";

function App() {
    return (
        <div>
            <nav></nav>
            <Layout>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/containers" element={<Containers/>}/>
                    <Route path="/container-form" element={<CreateContainerForm/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/item-form/:containerId" element={<ItemPage />} />
                    <Route path="/items/:id" element={<ItemDescridePage />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
