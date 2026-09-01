import { ErrorMessage, Field } from "formik";
import { Plus } from "lucide-react";
import React from "react";

export default function Formategory({ onclose }) {
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-5">
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

        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>

          <Field
            as="textarea"
            name="description"
            rows={5}
            placeholder="Write category description..."
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
            onClick={onclose}
            className="btn btn-ghost w-full sm:w-auto"
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
