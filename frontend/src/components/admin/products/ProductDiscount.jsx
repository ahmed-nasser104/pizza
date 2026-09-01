import { ErrorMessage, Field } from "formik";
import React from "react";

export default function ProductDiscount() {
  return (
    <>
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
    </>
  );
}
