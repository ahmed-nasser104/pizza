import { useState } from "react";

import ProductHeader from "./ProductHeader";
import ProductsGrid from "./ProductsGrid";
import AddProductModal from "./AddProductModal";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ProductHeader onAddProduct={() => setIsOpen(true)} />

      <ProductsGrid />

      <AddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
