import { Formik, Form, Field, ErrorMessage } from "formik";
import { ImagePlus, FileImage, Save, X } from "lucide-react";
import toastError from "../../../utils/toast.error.js";
import { editCategory } from "../../../service/categoryApi.js";
import toast from "react-hot-toast";

export default function EditCategoryModal({ isOpen, onClose, category }) {
  if (!isOpen || !category) return null;

  const initialValues = {
    name: category.name,
    description: category.description,
    image: null,
    isAvailable: category.isAvailable,
  };

  const editHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("isAvailable", values.isAvailable);
      formData.append("image", values.image);
      const responce = await editCategory(formData, category._id);
      console.log(responce);
      onClose();
      toast.success("category edited successfully");
    } catch (error) {
      console.log(error);
      toastError(error);
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/20 p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-base-100 shadow-2xl">
            {/* Header */}

            <div className="flex items-center justify-between border-b border-base-300 p-5">
              <div>
                <h2 className="text-xl font-bold md:text-2xl">Edit Category</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update category information.
                </p>
              </div>

              <button onClick={onClose} className="btn btn-circle btn-ghost">
                <X size={20} />
              </button>
            </div>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={editHandler}
            >
              {({ values, setFieldValue }) => (
                <Form className="grid max-h-[85vh] gap-6 overflow-y-auto p-5 lg:grid-cols-2">
                  {/* Image */}

                  <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 transition hover:border-primary hover:bg-base-200 md:h-96">
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
                        <FileImage size={60} className="text-success" />

                        <p className="mt-4 text-center font-semibold">
                          {values.image.name}
                        </p>

                        <span className="text-success text-sm">
                          New image selected
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-48 w-full rounded-2xl object-cover md:h-72"
                        />

                        <p className="mt-4 text-center text-sm text-gray-500">
                          Click to replace image
                        </p>
                      </>
                    )}
                  </label>

                  {/* Form */}

                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="label">
                        <span className="label-text">Category Name</span>
                      </label>

                      <Field
                        name="name"
                        className="input input-bordered w-full"
                      />

                      <ErrorMessage
                        name="name"
                        component="p"
                        className="mt-1 text-sm text-error"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>

                      <Field
                        as="textarea"
                        rows={5}
                        name="description"
                        className="textarea textarea-bordered w-full"
                      />

                      <ErrorMessage
                        name="description"
                        component="p"
                        className="mt-1 text-sm text-error"
                      />
                    </div>

                    <label className="flex items-center justify-between rounded-xl border border-base-300 p-4">
                      <span className="font-medium">Available</span>

                      <Field
                        type="checkbox"
                        name="isAvailable"
                        className="toggle toggle-success"
                      />
                    </label>

                    <div className="mt-auto flex flex-col-reverse gap-3 border-t border-base-300 pt-6 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-ghost w-full sm:w-auto"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="btn btn-primary w-full sm:w-auto"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
