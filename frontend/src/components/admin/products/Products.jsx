import { useState } from "react";

import ProductHeader from "./ProductHeader";
import ProductFilters from "./ProductFilters";
import ProductsGrid from "./ProductsGrid";
import AddProductModal from "./AddProductModal";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ProductHeader onAddProduct={() => setIsOpen(true)} />

      <ProductFilters />

      <ProductsGrid />

      <AddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
