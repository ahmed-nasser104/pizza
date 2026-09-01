export default function DeleteModal({ onClose, deleteUser, userId }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold">Delete Product?</h2>

        <p className="mt-2 text-gray-500">
          Are you sure you want to delete this product?
        </p>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={() => deleteUser(userId)} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
