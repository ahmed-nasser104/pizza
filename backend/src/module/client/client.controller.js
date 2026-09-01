import Router from "express";
import { auth } from "../../common/middleware/auth.js";
import {
  addToCart,
  deleteCartItem,
  getUserCart,
  getProductById,
  getProducts,
  getUserProfile,
  addOrder,
} from "./client.service.js";
import { successResponce } from "../../common/responce/SuccessResponce.js";
const router = Router();
router.get("/products", auth, async (req, res) => {
  const Products = await getProducts();
  successResponce({
    res,
    status: 200,
    message: "Products",
    data: Products,
  });
});
router.get("/userId", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await getUserProfile(userId);
  successResponce({
    res,
    status: 200,
    message: "User",
    data: user,
  });
});
router.get("/cart", auth, async (req, res) => {
  const user = req.user.id;
  const cart = await getUserCart(user);
  successResponce({
    res,
    status: 200,
    message: "cart founded",
    data: cart,
  });
});
router.get("/product/:productId", auth, async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  successResponce({
    res,
    status: 200,
    message: "Product founded",
    data: product,
  });
});
router.post("/product/:productId", auth, async (req, res) => {
  const user = req.user.id;
  const { productId } = req.params;
  const product = await addToCart(req.body, user, productId);
  successResponce({
    res,
    status: 201,
    message: "item add to cart",
    data: product,
  });
});

router.post("/order", auth, async (req, res) => {
  const userId = req.user.id;
  const order = await addOrder(req.body, userId);
  successResponce({
    res,
    status: 201,
    message: "order created",
    data: order,
  });
});
router.delete("/cart/:cartId", auth, async (req, res) => {
  const { cartId } = req.params;
  const deletedProduct = await deleteCartItem(req.user.id, cartId);
  successResponce({
    res,
    status: 200,
    message: "Product deleted successfully",
    data: deletedProduct,
  });
});
export default router;
