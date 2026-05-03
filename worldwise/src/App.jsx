import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound.jsx";
import Cities from "./components/Cities.jsx";
import Countries from "./components/Countries.jsx";
import Form from "./components/Form.jsx";
import City from "./components/City.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";

export default function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/app" element={<AppLayout />}>
                        <Route index element={<Navigate replace to="/app/cities" />} />
                        <Route path="cities" element={<Cities />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<Countries />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}