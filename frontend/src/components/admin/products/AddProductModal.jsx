import { ImagePlus, X, Plus, FileImage } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addProduct } from "../../../service/productApi.js";
import { useEffect, useState } from "react";
import { getCategories } from "../../../service/categoryApi.js";
import toastError from "../../../utils/toast.error.js";
import toast from "react-hot-toast";
import { initialValues } from "./products.initial.js";
import HeaderProduct from "./HeaderProduct.jsx";
import ProductDescription from "./ProductDescription.jsx";
import ProductDiscount from "./ProductDiscount.jsx";
import { productHandler } from "./productHandler.js";
export default function AddProductModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const categoriesShow = async () => {
      const responce = await getCategories();
      setCategories(responce.data.data);
    };
    categoriesShow();
  }, []);
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-6xl rounded-3xl bg-base-100 shadow-2xl max-h-[95vh] overflow-y-auto">
            {" "}
            {/* Header */}
            <HeaderProduct onClose={onClose} />
            {/* Body */}
            <div className="">
              {/* Upload */}

              {/* Form */}

              <Formik
                initialValues={initialValues}
                onSubmit={(values) => productHandler(values, onClose)}
              >
                {({ values, setFieldValue }) => (
                  <Form className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-2">
                    {" "}
                    <label className="flex min-h-55 sm:min-h-80 lg:min-h-105 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 transition hover:border-error hover:bg-base-200">
                      {" "}
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
                          <FileImage
                            size={60}
                            className="text-success sm:h-20 sm:w-20"
                          />
                          <p className="mt-4 font-semibold">
                            {values.image.name}
                          </p>

                          <span className="text-sm text-success">
                            File selected successfully
                          </span>
                        </>
                      ) : (
                        <>
                          <ImagePlus
                            size={60}
                            className="text-gray-400 sm:h-20 sm:w-20"
                          />
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

                      <ProductDescription categories={categories} />

                      {/* Discount & Quantity */}

                      <ProductDiscount />

                      {/* Available & Featured */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {" "}
                        <label className="flex items-center justify-between rounded-xl border border-base-300 p-4">
                          <span>Available</span>
                          <Field
                            type="checkbox"
                            name="isAvailable"
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
                      <div className="mt-4 flex flex-col-reverse gap-3 border-t border-base-300 pt-6 sm:flex-row sm:justify-end">
                        {" "}
                        <button className="btn btn-ghost w-full sm:w-auto">
                          {" "}
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-error w-full sm:w-auto text-white"
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
      </div>
    </>
  );
}
