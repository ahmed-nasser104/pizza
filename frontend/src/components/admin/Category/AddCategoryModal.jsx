import { Formik, Form, Field, ErrorMessage } from "formik";
import { ImagePlus, FileImage, Plus, X } from "lucide-react";
import { categoryApi } from "../../../service/categoryApi.js";
import toastError from "../../../utils/toast.error.js";
import toast from "react-hot-toast";

export default function AddCategoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const initialValues = {
    name: "",
    description: "",
    image: null,
    isAvailable: true,
  };

  const categoryHandler = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("isAvailable", values.isAvailable);
      formData.append("image", values.image);
      await categoryApi(formData);
      onClose();
      toast.success("category added successfully");
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl rounded-3xl bg-base-100 shadow-2xl">
          {/* Header */}

          <div className="flex items-center justify-between border-b border-base-300 p-6">
            <div>
              <h2 className="text-2xl font-bold">Add New Category</h2>

              <p className="mt-1 text-sm text-gray-500">
                Create a new category for your restaurant menu.
              </p>
            </div>

            <button onClick={onClose} className="btn btn-circle btn-ghost">
              <X size={20} />
            </button>
          </div>

          <Formik initialValues={initialValues} onSubmit={categoryHandler}>
            {({ values, setFieldValue }) => (
              <Form className="grid gap-8 p-6 lg:grid-cols-2">
                {/* Upload */}

                <label className="flex h-96 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 transition hover:border-primary hover:bg-base-200">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        setFieldValue("image", file);
                      }
                    }}
                  />

                  {values.image ? (
                    <>
                      <FileImage size={70} className="text-success" />

                      <p className="mt-4 font-semibold">{values.image.name}</p>

                      <span className="text-success text-sm">
                        Image selected successfully
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

                {/* Form */}

                <div className="flex flex-col gap-5">
                  {/* Category Name */}

                  <div>
                    <label className="label">
                      <span className="label-text">Category Name</span>
                    </label>

                    <Field
                      name="name"
                      type="text"
                      placeholder="Pizza"
                      className="input input-bordered w-full"
                    />

                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1 text-sm text-error"
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
                      rows={6}
                      placeholder="Write category description..."
                      className="textarea textarea-bordered w-full"
                    />

                    <ErrorMessage
                      name="description"
                      component="p"
                      className="mt-1 text-sm text-error"
                    />
                  </div>

                  {/* Availability */}

                  <label className="flex items-center justify-between rounded-xl border border-base-300 p-4">
                    <span className="font-medium">Available</span>

                    <Field
                      type="checkbox"
                      name="isAvailable"
                      className="toggle toggle-success"
                    />
                  </label>

                  {/* Footer */}

                  <div className="mt-auto flex justify-end gap-3 border-t border-base-300 pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-primary">
                      <Plus size={18} />
                      Add Category
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
