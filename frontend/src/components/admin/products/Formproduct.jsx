import { Field, ErrorMessage } from "formik";

export default function FormProduct({ onClose }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Product Name</span>
        </label>
        <Field
          name="ProductName"
          className="input input-bordered w-full rounded-xl"
          placeholder="e.g. Pepperoni Pizza"
        />
        <ErrorMessage
          name="ProductName"
          component="span"
          className="mt-1 text-xs text-error"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Price ($)</span>
          </label>
          <Field
            type="number"
            name="price"
            className="input input-bordered w-full rounded-xl"
            placeholder="0.00"
          />
          <ErrorMessage
            name="price"
            component="span"
            className="mt-1 text-xs text-error"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Quantity</span>
          </label>
          <Field
            type="number"
            name="Quantity"
            className="input input-bordered w-full rounded-xl"
            placeholder="0"
          />
          <ErrorMessage
            name="Quantity"
            component="span"
            className="mt-1 text-xs text-error"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <label className="label">
          <span className="label-text font-medium">Quantity</span>
        </label>
        <Field
          name="discount"
          className="input input-bordered w-full rounded-xl"
        />
        <ErrorMessage
          name="discount"
          component="span"
          className="mt-1 text-xs text-error"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Description</span>
        </label>
        <Field
          as="textarea"
          name="description"
          rows={4}
          className="textarea textarea-bordered w-full rounded-xl resize-none"
          placeholder="Short description of the product"
        />
        <ErrorMessage
          name="description"
          component="span"
          className="mt-1 text-xs text-error"
        />
      </div>

      <label className="label cursor-pointer justify-start gap-3">
        <Field
          type="checkbox"
          name="isAvailable"
          className="toggle toggle-success"
        />
        <span className="label-text font-medium">Available for order</span>
      </label>

      <div className="mt-2 flex flex-col-reverse sm:flex-row gap-3">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline flex-1 rounded-xl"
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-warning flex-1 rounded-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
}
