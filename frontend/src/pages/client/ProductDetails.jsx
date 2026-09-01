import { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../service/productApi";
export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setproduct] = useState(null);
  const getProduct = async () => {
    const rerponce = await getProductById(productId);
    console.log(rerponce);
    setproduct(rerponce.data.data);
  };
  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div className="min-h-screen bg-base-200 py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Link
          to="/client"
          className="btn btn-ghost btn-sm sm:btn-md mb-4 sm:mb-6 gap-2"
        >
          <FaArrowLeft />
          Back to Menu
        </Link>

        {/* Product Card */}
        <div className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden">
          {/* Product Image */}
          <div className="lg:w-1/2 relative bg-base-300">
            {product ? (
              <img
                src={product?.image}
                alt={product?.ProductName}
                className="sm:h-72 md:h-96 lg:h-full lg:min-h-137.5 object-cover"
              />
            ) : (
              <div className="w-full h-56 sm:h-72 md:h-96 lg:h-full lg:min-h-137.5 skeleton rounded-none" />
            )}

            {/* Category */}
            {product?.category?.name && (
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <span className="badge badge-warning badge-lg font-semibold shadow-md">
                  {product.category.name}
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="card-body p-5 sm:p-6 lg:p-10 lg:w-1/2">
            {product ? (
              <>
                {/* Header */}
                <div className="border-b border-base-300 pb-5">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                    {product?.ProductName}
                  </h1>
                  <p className="mt-4 text-base-content/70 leading-7">
                    {product?.description}
                  </p>
                </div>

                {/* Price & Quantity */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-base-300 p-4 flex flex-col gap-1">
                    <span className="text-sm uppercase tracking-wide text-base-content/50">
                      Price
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-red-700">
                      ${product?.price}
                    </span>
                  </div>

                  <div className="rounded-xl border border-base-300 p-4 flex flex-col gap-1">
                    <span className="text-sm uppercase tracking-wide text-base-content/50">
                      Quantity
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-red-700">
                      {product?.Quantity}
                    </span>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-6 border-t border-base-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <span className="text-lg font-semibold">Total</span>

                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      ${product?.price}
                    </span>
                  </div>

                  <button className="btn btn-primary btn-lg w-full gap-3">
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </>
            ) : (
              /* Loading skeleton - presentational only, no state/logic added */
              <div className="flex flex-col gap-4">
                <div className="skeleton h-8 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="skeleton h-20 w-full" />
                  <div className="skeleton h-20 w-full" />
                </div>
                <div className="skeleton h-12 w-full mt-6" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
