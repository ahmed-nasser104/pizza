import { ErrorMessage, Field, Formik, Form } from "formik";
import { Home, MapPin, Phone, User } from "lucide-react";
import { initialData } from "../../pages/client/checkOut.initial.js";
import { validationSchema } from "../../pages/client/validation.js";
import { addOrder } from "../../service/orderApi.js";
import toast from "react-hot-toast";
export default function Delivery() {
  const SubmitHandler = async (values) => {
    try {
      const response = await addOrder(values);
      toast.success("Order placed successfully! 🎉");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
        {/* Delivery Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <MapPin className="text-primary" size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Delivery Information</h2>

            <p className="text-sm text-base-content/60">
              Where should we deliver your order?
            </p>
          </div>
        </div>

        {/* Formik */}
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={SubmitHandler}
        >
          <Form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                />

                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full rounded-xl pl-11"
                />
              </div>

              <ErrorMessage
                name="fullName"
                component="p"
                className="mt-1 text-sm text-error"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                />

                <Field
                  type="tel"
                  name="phone"
                  placeholder="01xxxxxxxxx"
                  className="input input-bordered w-full rounded-xl pl-11"
                />
              </div>

              <ErrorMessage
                name="phone"
                component="p"
                className="mt-1 text-sm text-error"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Street Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                />

                <Field
                  type="text"
                  name="street"
                  placeholder="Street name and building number"
                  className="input input-bordered w-full rounded-xl pl-11"
                />
              </div>

              <ErrorMessage
                name="streetAddress"
                component="p"
                className="mt-1 text-sm text-error"
              />
            </div>

            {/* Apartment / Building */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Apartment / Building
              </label>

              <div className="relative">
                <Home
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                />

                <Field
                  type="text"
                  name="building"
                  placeholder="Apartment, floor, building..."
                  className="input input-bordered w-full rounded-xl pl-11"
                />
              </div>

              <ErrorMessage
                name="apartment"
                component="p"
                className="mt-1 text-sm text-error"
              />
            </div>

            {/* City + Postal */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-semibold">City</label>

                <Field
                  type="text"
                  name="city"
                  placeholder="Cairo"
                  className="input input-bordered w-full rounded-xl"
                />

                <ErrorMessage
                  name="city"
                  component="p"
                  className="mt-1 text-sm text-error"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Postal Code
                </label>

                <Field
                  type="text"
                  name="postalCode"
                  placeholder="11511"
                  className="input input-bordered w-full rounded-xl"
                />

                <ErrorMessage
                  name="postalCode"
                  component="p"
                  className="mt-1 text-sm text-error"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Delivery Notes
                <span className="ml-2 font-normal text-base-content/50">
                  (Optional)
                </span>
              </label>

              <Field
                as="textarea"
                name="notes"
                placeholder="Any instructions for the delivery driver?"
                className="textarea textarea-bordered min-h-28 w-full rounded-xl"
              />

              <ErrorMessage
                name="notes"
                component="p"
                className="mt-1 text-sm text-error"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl text-base"
            >
              Place Order
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
