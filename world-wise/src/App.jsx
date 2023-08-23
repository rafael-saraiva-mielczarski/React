import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>list of cities</p>} />
          <Route path="cities" element={<p>list of cities</p>} />
          <Route path="countries" element={<p>list of countries</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
