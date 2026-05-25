import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Cities from "./components/Cities.jsx";
import Countries from "./components/Countries.jsx";
import Form from "./components/Form.jsx";
import City from "./components/City.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// Lazy load page components for code splitting
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

// BEFORE optimization (no code splitting):
// dist/assets/index-8314c1bb.js   537.51 kB │ gzip: 157.71 kB

// AFTER optimization (with code splitting):
// dist/assets/index-3bfec217.js   378.06 kB │ gzip: 110.50 kB (main bundle)
// dist/assets/AppLayout-d9bce409.js   157.06 kB │ gzip: 46.27 kB (lazy)
// + smaller chunks for each page (Homepage, Login, Product, etc.)
// Result: -29.7% reduction in initial bundle size! 🎉

export default function App() {
    return (
    <AuthProvider>
      <CitiesProvider>
            <BrowserRouter>
                <Suspense fallback={<SpinnerFullPage />}>
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                            <Route index element={<Navigate replace to="/app/cities" />} />
                            <Route path="cities" element={<Cities />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<Countries />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
    );
}