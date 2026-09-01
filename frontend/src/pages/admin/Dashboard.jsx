import { TrendingUp, Clock, Pizza, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/productApi.js";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const responce = await getProducts();
      setProducts(responce.data.data);
      console.log();
    };
    getApi();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 bg-orange-50/40 p-3 sm:p-4 md:p-6">
      {/* Header - pizza themed banner */}

      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-red-600 via-red-500 to-orange-500 p-5 sm:p-8 shadow-lg">
        <Pizza
          size={140}
          className="absolute -right-6 -top-6 text-white/10 rotate-12 hidden sm:block"
        />

        <div className="relative flex items-center gap-2 text-orange-100">
          <Flame size={18} />
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
            Pizza Palace Dashboard
          </span>
        </div>

        <h1 className="relative mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          Welcome back, Chef 🍕
        </h1>

        <p className="relative mt-2 max-w-md text-sm sm:text-base text-orange-50/90">
          Here's what's cooking in your restaurant today.
        </p>
      </div>

      {/* Sales */}

      <div className="rounded-3xl border border-orange-100 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div>
            <h2 className="font-bold text-lg sm:text-xl text-slate-800">
              Sales Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Last 7 days performance
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-2.5 sm:p-3 text-orange-500">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="h-36 sm:h-44 md:h-48 flex items-end gap-2 sm:gap-4">
          {[40, 70, 50, 90, 60, 80, 100].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-full bg-linear-to-t from-red-600 to-orange-400 transition-all hover:from-red-700 hover:to-orange-500"
              style={{
                height: `${height}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent Products */}

      <div className="rounded-3xl border border-orange-100 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <div className="rounded-xl bg-orange-50 p-2 text-orange-500">
            <Clock size={18} />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Recent Products
          </h2>
        </div>

        {/* Menu-style grid - each product shown as a card, works on any screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 ">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-3 hover:scale-90 transition"
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                <img
                  src={product.image}
                  alt={product.ProductName}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-800 text-sm sm:text-base">
                  {product.ProductName}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500">
                  Qty: {product.Quantity}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-red-500 px-3 py-1 text-xs sm:text-sm font-bold text-white">
                ${product.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
