import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

const BASE_URL = "http://localhost:9000";

export default function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.error("Error fetching cities:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/product" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppLayout cities={cities} />}>
                    <Route index element={<Navigate replace to="/app/cities" />} />
                    <Route path="cities" element={<Cities cities={cities} isLoading={isLoading} />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<Countries cities={cities} isLoading={isLoading} />} />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}