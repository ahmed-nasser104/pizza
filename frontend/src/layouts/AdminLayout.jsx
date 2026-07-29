import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "../pages/admin/AdminSidebar";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 flex">
      <AdminSidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      <div className="flex-1 flex flex-col">
        <header className="lg:hidden bg-white p-4 shadow flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-square btn-ghost bg-black"
          >
            <Menu />
          </button>
        </header>

        <main className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
