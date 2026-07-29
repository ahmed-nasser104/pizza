import { useEffect, useState } from "react";
import AddCategoryModal from "../../components/admin/Category/AddCategoryModal";
import { getCategories } from "../../service/categoryApi.js";

export default function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    const allCategories = async () => {
      const responce = await getCategories();
      setcategories(responce.data.data);
      console.log(responce);
    };
    allCategories();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="btn btn-error"
        >
          Add Category
        </button>
      </div>

      {/* هنا بعدين هتحط جدول أو Cards */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.length !== 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300"
            >
              <figure className="h-52 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>

              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">{cat.name}</h2>

                  <div
                    className={`badge ${
                      cat.isAvailable ? "badge-success" : "badge-error"
                    }`}
                  >
                    {cat.isAvailable ? "Available" : "Unavailable"}
                  </div>
                </div>

                <p className="line-clamp-2 text-sm text-gray-500">
                  {cat.description}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-sm">Edit</button>

                  <button className="btn btn-error btn-sm text-white">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-dashed border-base-300 p-12 text-center">
            <h3 className="text-xl font-semibold">No Categories Yet</h3>

            <p className="mt-2 text-gray-500">
              Create your first category to start organizing your menu.
            </p>
          </div>
        )}
      </div>

      <AddCategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
