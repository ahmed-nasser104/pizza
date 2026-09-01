import { Formik, Form } from "formik";
import { ImagePlus, FileImage } from "lucide-react";
import toast from "react-hot-toast";
import { updateProductApi } from "../../../service/productApi.js";
import toastError from "../../../utils/toast.error.js";
import HeaderProductE from "./HeaderProductE.jsx";
import FormProduct from "./Formproduct.jsx";
import { getProductInitialValues } from "./product.initialValues.js";

export default function EditProductModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  const editHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("ProductName", values.ProductName);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("Quantity", values.Quantity);
      formData.append("isAvailable", values.isAvailable);
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      console.log(product);
      await updateProductApi(product._id, formData);
      onClose();
      toast.success("Product updated successfully");
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-0 sm:p-4">
      <div className="flex min-h-full items-end sm:items-center justify-center">
        <div className="w-full max-w-5xl overflow-hidden rounded-t-3xl sm:rounded-3xl bg-base-100 shadow-2xl">
          {/* Header */}
          <HeaderProductE onClose={onClose} />

          <Formik
            initialValues={getProductInitialValues(product)}
            onSubmit={editHandler}
          >
            {({ values, setFieldValue }) => (
              <Form className="grid max-h-[85vh] gap-6 overflow-y-auto p-4 sm:p-5 lg:grid-cols-2">
                {/* Upload */}
                <label className="relative flex h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-base-300 transition hover:border-primary hover:bg-base-200 sm:h-64 md:h-96">
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
                      <FileImage size={50} className="text-success" />

                      <p className="mt-4 max-w-full truncate px-4 text-center font-semibold">
                        {values.image.name}
                      </p>

                      <span className="text-success text-sm">
                        New image selected
                      </span>
                    </>
                  ) : product?.image ? (
                    <img
                      src={product.image}
                      alt={product.ProductName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <ImagePlus size={50} className="text-gray-400" />

                      <p className="mt-4 font-medium">Click to upload</p>

                      <span className="text-center text-sm text-gray-400">
                        PNG, JPG or WEBP
                      </span>
                    </>
                  )}
                </label>

                {/* Form */}
                <FormProduct onClose={onClose} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
