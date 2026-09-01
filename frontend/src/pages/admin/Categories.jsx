import { useEffect, useState } from "react";
import AddCategoryModal from "../../components/admin/Category/AddCategoryModal";
import { getCategories } from "../../service/categoryApi.js";
import EditCategoryModal from "../../components/admin/Category/EditCategoryModal.jsx";
import DeleteCategoryModal from "../../components/admin/Category/DeleteCategoryModal.jsx";
import { Pencil, Trash2, PackageOpen } from "lucide-react";

export default function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  useEffect(() => {
    const allCategories = async () => {
      const responce = await getCategories();
      setcategories(responce.data.data);
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

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.length !== 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="group card overflow-hidden rounded-2xl border border-base-300/60 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <figure className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay for legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0" />

                {/* Floating status badge */}
                <div
                  className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${
                    cat.isAvailable
                      ? "bg-success/90 text-success-content"
                      : "bg-error/90 text-error-content"
                  }`}
                >
                  {cat.isAvailable ? "Available" : "Unavailable"}
                </div>

                {/* Title floating on image */}
                <h2 className="absolute bottom-3 left-4 right-4 truncate text-lg font-bold text-white drop-shadow-sm">
                  {cat.name}
                </h2>
              </figure>

              {/* Body */}
              <div className="card-body gap-3 p-4 sm:p-5">
                <p className="line-clamp-2 min-h-10 text-sm text-gray-500">
                  {cat.description}
                </p>

                <div className="divider my-0"></div>

                <div className="card-actions justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setEditOpen(true);
                    }}
                    className="btn btn-outline btn-sm flex-1 sm:flex-none rounded-xl gap-1.5"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDeleteOpen(true);
                    }}
                    className="btn btn-error btn-sm flex-1 sm:flex-none rounded-xl gap-1.5"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-100 px-4 py-14 sm:py-20 text-center">
            <PackageOpen size={56} className="text-gray-400" />

            <h3 className="mt-4 text-lg sm:text-xl font-semibold">
              No Categories Yet
            </h3>

            <p className="mt-2 max-w-sm text-sm sm:text-base text-gray-500">
              Create your first category to start organizing your menu.
            </p>
          </div>
        )}
      </div>

      <AddCategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EditCategoryModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        category={selectedCategory}
      />
      <DeleteCategoryModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        category={selectedCategory}
        onDelete={(id) => {
          setcategories((prev) => prev.filter((cat) => cat._id !== id));
        }}
      />
    </>
  );
}
