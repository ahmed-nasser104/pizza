import {
  LayoutDashboard,
  ShoppingCart,
  Pizza,
  Users,
  Boxes,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar({
  isOpen = false,
  closeSidebar = () => {},
}) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      end: true,
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders",
    },
    {
      name: "Categories",
      icon: Pizza,
      path: "/admin/categories",
    },
    {
      name: "Products",
      icon: Pizza,
      path: "/admin/products",
    },
    {
      name: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={` fixed lg:static top-0 left-0 z-50 h-full md:h-screen w-72 shrink-0 bg-slate-950 text-white border-r border-slate-800 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-5">
          {/* Logo */}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg">
                <Pizza size={25} />
              </div>

              <div>
                <h1 className="font-bold text-xl">PizzaHub</h1>

                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            </div>

            <button
              onClick={closeSidebar}
              className="lg:hidden btn btn-sm btn-circle btn-ghost"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu */}

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `
                      group
                      flex
                      items-center
                      justify-between
                      
                      px-4
                      py-3
                      
                      rounded-xl
                      
                      transition-all
                      
                      ${
                        isActive
                          ? "bg-red-500 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }
                      `
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={21} />

                    <span className="font-medium">{item.name}</span>
                  </div>

                  <ChevronRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition"
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}

          <div className="border-t border-slate-800 pt-4">
            <button
              onClick={logOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={21} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
