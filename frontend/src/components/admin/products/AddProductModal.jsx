import { ImagePlus, X, Plus, FileImage } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addProduct } from "../../../service/productApi.js";
import { useEffect, useState } from "react";
import { getCategories } from "../../../service/categoryApi.js";
import toastError from "../../../utils/toast.error.js";
import toast from "react-hot-toast";
export default function AddProductModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const categories = async () => {
      const responce = await getCategories();
      setCategories(responce.data.data);
    };
    categories();
  }, []);
  if (!isOpen) return null;
  const initialValues = {
    ProductName: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    Quantity: "",
    image: "",
    isAvailable: true,
    featured: false,
  };

  const productHandler = async (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append("ProductName", values.ProductName);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("Quantity", values.Quantity);
    formData.append("isAvailable", values.isAvailable);
    formData.append("image", values.image);
    try {
      console.log("قبل الريكوست");

      const response = await addProduct(formData, values.category);

      console.log("بعد الريكوست", response);

      toast.success("Product added successfully 🎉");

      console.log("بعد التوست");
    } catch (error) {
      console.log("دخل الكاتش", error);
      toastError(error);
    }
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl rounded-3xl bg-base-100 shadow-2xl">
          {/* Header */}

          <div className="flex items-center justify-between border-b border-base-300 p-6">
            <div>
              <h2 className="text-2xl font-bold">Add New Product</h2>

              <p className="text-sm text-gray-500 mt-1">
                Fill the information below to create a new menu item.
              </p>
            </div>

            <button onClick={onClose} className="btn btn-circle btn-ghost">
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="">
            {/* Upload */}

            {/* Form */}

            <Formik initialValues={initialValues} onSubmit={productHandler}>
              {({ values, setFieldValue }) => (
                <Form className="space-y-5 grid gap-8 p-6 lg:grid-cols-2">
                  <label className="flex h-96 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 transition hover:border-error hover:bg-base-200">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setFieldValue("image", file);
                      }}
                    />

                    {values.image ? (
                      <>
                        <FileImage size={70} className="text-success" />

                        <p className="mt-4 font-semibold">
                          {values.image.name}
                        </p>

                        <span className="text-sm text-success">
                          File selected successfully
                        </span>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={70} className="text-gray-400" />

                        <p className="mt-4 font-medium">Click to upload</p>

                        <span className="text-sm text-gray-400">
                          PNG, JPG or WEBP
                        </span>
                      </>
                    )}
                  </label>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="label">
                        <span className="label-text">Product Name</span>
                      </label>

                      <Field
                        name="ProductName"
                        type="text"
                        placeholder="Pepperoni Pizza"
                        className="input input-bordered w-full"
                      />

                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-error text-sm mt-1"
                      />
                    </div>

                    {/* Description */}

                    <div>
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>

                      <Field
                        as="textarea"
                        name="description"
                        rows={4}
                        placeholder="Write product description..."
                        className="textarea textarea-bordered w-full"
                      />

                      <ErrorMessage
                        name="description"
                        component="p"
                        className="text-error text-sm mt-1"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label">
                          <span className="label-text">Category</span>
                        </label>

                        <Field
                          as="select"
                          name="category"
                          className="select select-bordered w-full"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => {
                            return (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            );
                          })}
                        </Field>

                        <ErrorMessage
                          name="category"
                          component="p"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="label">
                          <span className="label-text">Price</span>
                        </label>

                        <Field
                          name="price"
                          type="number"
                          className="input input-bordered w-full"
                        />

                        <ErrorMessage
                          name="price"
                          component="p"
                          className="text-error text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Discount & Quantity */}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label">
                          <span className="label-text">Discount</span>
                        </label>

                        <Field
                          name="discount"
                          type="number"
                          className="input input-bordered w-full"
                        />

                        <ErrorMessage
                          name="discount"
                          component="p"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="label">
                          <span className="label-text">Quantity</span>
                        </label>

                        <Field
                          name="Quantity"
                          type="number"
                          className="input input-bordered w-full"
                        />

                        <ErrorMessage
                          name="quantity"
                          component="p"
                          className="text-error text-sm mt-1"
                        />
                      </div>
                    </div>

                    {/* Available & Featured */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="flex items-center justify-between rounded-xl border border-base-300 p-4">
                        <span>Available</span>
                        <Field
                          type="checkbox"
                          name="available"
                          className="toggle toggle-success"
                        />
                      </label>
                      <label className="flex items-center justify-between rounded-xl border border-base-300 p-4">
                        <span>Featured</span>

                        <Field
                          type="checkbox"
                          name="featured"
                          className="toggle toggle-error"
                        />
                      </label>
                    </div>
                    <div className="flex justify-end gap-3 border-t border-base-300 p-6">
                      <button onClick={onClose} className="btn btn-ghost">
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="btn btn-error text-white"
                      >
                        <Plus size={18} />
                        Add Product
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Footer */}
        </div>
      </div>
    </>
  );
}
