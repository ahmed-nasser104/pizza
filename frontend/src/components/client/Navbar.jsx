import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPizzaSlice,
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
  FaBars,
} from "react-icons/fa";
import { useCartModalStore, useCartStore } from "../../store/store.js";
import Profile from "./Profile.jsx";
import { getUserProfileApi } from "../../service/userApi.js";

export default function Navbar() {
  const { cart } = useCartStore();
  const { openCart } = useCartModalStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState([]);
  const userData = async () => {
    const responce = await getUserProfileApi();
    setUser(responce.data.data);
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-2 sm:px-4">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          {/* Logo */}
          <Link
            to="/client"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black flex items-center gap-1 sm:gap-2 text-primary"
          >
            <FaPizzaSlice className="text-2xl sm:text-3xl md:text-4xl rotate-12" />
            Pizza<span className="text-warning">Hub</span>
          </Link>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3.5 sm:gap-2">
          {/* Theme */}
          <button className="btn btn-circle btn-ghost btn-sm sm:btn-md">
            <FaMoon size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Cart */}
          <div
            onClick={openCart}
            className="btn btn-circle btn-primary btn-sm sm:btn-md relative"
          >
            <FaShoppingCart size={16} className="sm:w-4.5 sm:h-4.5" />
            <div className="badge badge-secondary badge-sm sm:badge-md absolute -top-2 -right-2">
              {cart.length}
            </div>
          </div>

          {/* Profile */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="btn btn-circle btn-outline btn-sm sm:btn-md flex"
          >
            <FaUserCircle />
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      <Profile
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}
