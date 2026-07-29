import { FaTrash } from "react-icons/fa";

export default function CartItem({ products }) {
  console.log(products);

  return (
    <>
      {products.map((el) => {
        return (
          <div className="flex gap-4 bg-base-200 rounded-2xl p-3 shadow">
            <img
              src={el.images[0]}
              alt="pizza"
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-lg">{el.title}</h2>
                </div>

                <button className="btn btn-circle btn-error btn-sm">
                  <FaTrash />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-primary">
                  ${el.price}
                </span>

                <div className="join">
                  <button className="join-item btn">-</button>

                  <button className="join-item btn btn-disabled">2</button>

                  <button className="join-item btn">+</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
