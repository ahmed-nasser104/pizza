export const getProductInitialValues = (product) => ({
  ProductName: product?.ProductName || "",
  discount: product?.discount || "",
  description: product?.description || "",
  price: product?.price || "",
  Quantity: product?.Quantity || 0,
  isAvailable: product?.isAvailable || false,
  image: null,
});
