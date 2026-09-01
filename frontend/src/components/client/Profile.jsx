import { FiMail, FiPhone, FiUser, FiLogOut, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProfileModal({ user, isOpen, onClose }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-[calc(100%-2rem)]
              max-w-md
              max-h-[90vh]
              -translate-x-1/2
              -translate-y-1/2
              overflow-y-auto
              rounded-2xl
              bg-base-100
              shadow-2xl
            "
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-base-100 p-4 sm:p-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">My Profile</h2>

                <p className="text-xs sm:text-sm text-base-content/50">
                  Account information
                </p>
              </div>

              <button onClick={onClose} className="btn btn-circle btn-sm">
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5">
              {/* User */}
              <div className="mb-6 flex flex-col items-center">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FiUser size={28} className="sm:hidden" />
                  <FiUser size={35} className="hidden sm:block" />
                </div>

                <h3 className="mt-3 text-lg sm:text-xl font-bold text-center">
                  {user.fullName}
                </h3>

                <p className="text-xs sm:text-sm text-base-content/50 text-center break-all">
                  {user.email}
                </p>
              </div>

              {/* Name */}
              <div className="flex items-center gap-3 sm:gap-4 rounded-xl bg-base-200 p-3 sm:p-4">
                <FiUser size={20} className="shrink-0 text-primary sm:hidden" />
                <FiUser
                  size={21}
                  className="hidden shrink-0 text-primary sm:block"
                />

                <div className="min-w-0">
                  <p className="text-xs text-base-content/50">Name</p>

                  <p className="truncate font-semibold">{user.fullName}</p>
                </div>
              </div>

              {/* Email */}
              <div className="mt-3 flex items-center gap-3 sm:gap-4 rounded-xl bg-base-200 p-3 sm:p-4">
                <FiMail size={20} className="shrink-0 text-primary sm:hidden" />
                <FiMail
                  size={21}
                  className="hidden shrink-0 text-primary sm:block"
                />

                <div className="min-w-0">
                  <p className="text-xs text-base-content/50">Email</p>

                  <p className="truncate font-semibold">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="mt-3 flex items-center gap-3 sm:gap-4 rounded-xl bg-base-200 p-3 sm:p-4">
                <FiPhone
                  size={20}
                  className="shrink-0 text-primary sm:hidden"
                />
                <FiPhone
                  size={21}
                  className="hidden shrink-0 text-primary sm:block"
                />

                <div className="min-w-0">
                  <p className="text-xs text-base-content/50">Phone</p>

                  <p className="truncate font-semibold">
                    {user.phone ? user.phone : "Not provided"}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="btn btn-error mt-6 w-full"
              >
                <FiLogOut size={20} />
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
