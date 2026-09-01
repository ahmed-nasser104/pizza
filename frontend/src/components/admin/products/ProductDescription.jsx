import { ErrorMessage, Field } from "formik";
import React from "react";

export default function ProductDescription({ categories }) {
  return (
    <>
      {" "}
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
    </>
  );
}
