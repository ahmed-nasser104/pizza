import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sign from "./pages/sign-up/Sign";
import Login from "./pages/login/Login";
import VerifyOtp from "./pages/otp/Otp";
import ClientPage from "./pages/client/ClientPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./components/admin/products/Products";
import OrdersPage from "./pages/admin/OrdersPage";
import CustomersPage from "./pages/admin/CustomersPage";
import InventoryPage from "./pages/admin/InventoryPage";
import SettingsPage from "./pages/admin/SettingsPage";
import Categories from "./pages/admin/Categories";
import CartModal from "./components/client/CartModal";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductDetails from "./pages/client/ProductDetails";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/client/CheckoutPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CartModal />
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Sign />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/check-out" element={<CheckoutPage />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
