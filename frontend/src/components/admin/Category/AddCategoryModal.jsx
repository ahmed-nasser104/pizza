import { Formik, Form, Field, ErrorMessage } from "formik";
import { ImagePlus, FileImage, Plus, X } from "lucide-react";
import { categoryApi } from "../../../service/categoryApi.js";
import toastError from "../../../utils/toast.error.js";
import toast from "react-hot-toast";
import HeaderCategory from "./HeaderCategory.jsx";
import Formategory from "./Formategory.jsx";
import { initialValues } from "./category.initialValues.js";

export default function AddCategoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-base-100 shadow-2xl">
            {/* Header */}
            <HeaderCategory onClose={onClose} />
            <Formik initialValues={initialValues} onSubmit={categoryHandler}>
              {({ values, setFieldValue }) => (
                <Form className="grid max-h-[85vh] gap-6 overflow-y-auto p-5 lg:grid-cols-2">
                  {/* Upload */}

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
                          Image selected successfully
                        </span>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={60} className="text-gray-400" />

                        <p className="mt-4 font-medium">Click to upload</p>

                        <span className="text-center text-sm text-gray-400">
                          PNG, JPG or WEBP
                        </span>
                      </>
                    )}
                  </label>

                  {/* Form */}

                  <Formategory onclose={onClose} />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
