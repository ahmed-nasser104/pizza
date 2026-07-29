import { Link } from "react-router-dom";
import {
  FaPizzaSlice,
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
} from "react-icons/fa";
import { useCartModalStore, useCartStore } from "../../store/store.js";

export default function Navbar() {
  const { cart } = useCartStore();
  const { openCart } = useCartModalStore();
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50  p-5">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-100 p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/offers">Offers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/client"
          className="md:text-2xl lg:text-3xl font-black flex items-center gap-2 text-primary"
        >
          <FaPizzaSlice className="text-4xl rotate-12" />
          Pizza<span className="text-warning">Hub</span>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 font-semibold">
          <li>
            <Link to="/client">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        <button className="btn btn-circle btn-ghost">
          <FaMoon size={18} />
        </button>

        {/* Cart */}
        <div onClick={openCart} className="btn btn-circle btn-primary relative">
          <FaShoppingCart size={18} />

          <div className="badge badge-secondary absolute -top-2 -right-2">
            {cart.length}
          </div>
        </div>

        {/* Mobile User */}
        <button className="btn btn-circle btn-outline hidden md:flex">
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
}
