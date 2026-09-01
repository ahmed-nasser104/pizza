import { Users, Plus, Mail, Phone, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import StatusBadge from "../../components/ui/StatusBadge";
import { deleteUser, getUsersApi } from "../../service/userApi.js";
import DeleteModal from "../../components/admin/customers/DeleteModal.jsx";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [deleter, setDeleter] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const deleteHandler = async (userId) => {
    try {
      const response = await deleteUser(userId);
      setDeleter(false);
      getCustomers();
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomers = async () => {
    try {
      const users = await getUsersApi();
      setCustomers(users.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 p-3 sm:p-4 md:p-6">
      {customers.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-base-300 bg-base-100 py-14 sm:py-20 px-4 text-center">
          <Users size={56} className="mx-auto text-gray-400 sm:hidden" />
          <Users size={70} className="mx-auto text-gray-400 hidden sm:block" />

          <h2 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold">
            No Customers Yet
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Customers will appear here after creating an account.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {customers.map((customer) => (
            <div
              key={customer._id}
              className="group rounded-3xl border border-base-300 bg-base-100 p-4 sm:p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
            >
              {/* Header */}

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="avatar shrink-0">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden ring ring-primary ring-offset-2">
                    <img
                      src={
                        customer.profilePic ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          customer.fullName,
                        )}&background=random&size=128`
                      }
                      alt={customer.fullName}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg sm:text-xl font-bold">
                    {customer.fullName ==
                    "احمد عبد الناصر عبد الوهاب اسماعيل احمد"
                      ? "YOU"
                      : customer.fullName}
                  </h2>

                  <p className="truncate text-sm text-gray-500">
                    @{customer.userName}
                  </p>

                  <div className="mt-2 sm:mt-3">
                    <StatusBadge
                      status={customer.isVerified ? "Verified" : "Pending"}
                      variant={customer.isVerified ? "success" : "warning"}
                    />
                  </div>
                </div>
              </div>

              <div className="divider my-4 sm:my-5"></div>

              {/* Info */}

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-base-200 p-3">
                  <Mail className="text-primary shrink-0" size={18} />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>

                    <p className="truncate font-medium text-sm sm:text-base">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-base-200 p-3">
                  <Phone className="text-success shrink-0" size={18} />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>

                    <p className="truncate font-medium text-sm sm:text-base">
                      {customer.phone || "Not Added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 rounded-xl bg-base-200 p-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldCheck className="text-error shrink-0" size={18} />

                    <span className="text-sm font-medium">Role</span>
                  </div>

                  <span
                    className={`badge shrink-0 ${
                      customer.role === "admin"
                        ? "badge-error"
                        : "badge-primary"
                    }`}
                  >
                    {customer.role}
                  </span>
                </div>
              </div>

              {/* Footer */}

              <div className="mt-5 sm:mt-6 flex flex-col xs:flex-row gap-3 border-t border-base-300 pt-4 sm:pt-5">
                <button
                  onClick={() => {
                    setSelectedUserId(customer._id);
                    setDeleter(true);
                  }}
                  className="btn btn-outline btn-error flex-1 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {deleter && (
            <DeleteModal
              userId={selectedUserId}
              deleteUser={deleteHandler}
              onClose={() => setDeleter(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
