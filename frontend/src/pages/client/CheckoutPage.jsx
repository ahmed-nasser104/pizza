import { ShoppingBag } from "lucide-react";
import { getCartApi } from "../../service/catApi.js";
import { useEffect, useState } from "react";
import Delivery from "../../components/client/Delivery.jsx";

export default function CheckoutPage() {
  const [details, setDetails] = useState({
    items: [],
    totalPrice: 0,
  });

  const getCart = async () => {
    try {
      const response = await getCartApi();

      setDetails(
        response.data.data || {
          items: [],
          totalPrice: 0,
        },
      );
    } catch (error) {
      console.error(error);

      setDetails({
        items: [],
        totalPrice: 0,
      });
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const items = details?.items || [];
  const subtotal = Number(details?.totalPrice || 0);
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>

          <p className="mt-2 text-base-content/60">
            Complete your order and delivery information
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Delivery Information */}
          <Delivery />

          {/* Order Summary */}
          <div>
            <div className="sticky top-6 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
              {/* Title */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <ShoppingBag className="text-primary" size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  <p className="text-sm text-base-content/60">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-4">
                {items.length > 0 ? (
                  items.map((prod) => (
                    <div key={prod._id} className="flex items-center gap-3">
                      {/* Product Image */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-base-200">
                        <img
                          src={prod.product?.image}
                          alt={prod.product?.ProductName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold">
                          {prod.product?.ProductName}
                        </h3>

                        <p className="text-sm text-base-content/50">
                          Quantity: {prod.quantity || 0}
                        </p>
                      </div>

                      {/* Product Price */}
                      <span className="font-semibold">
                        {Number(prod.product?.price || 0) *
                          Number(prod.quantity || 0)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-base-content/50">
                    Your cart is empty
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-base-300" />

              {/* Prices */}
              <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Subtotal</span>

                  <span className="font-medium">{subtotal}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Delivery Fee</span>

                  <span className="font-medium">{deliveryFee}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-base-300" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>

                <span className="text-2xl font-bold text-primary">{total}</span>
              </div>

              <p className="mt-4 text-center text-xs text-base-content/50">
                Your order will be prepared after confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
