import Router from "express";
import { auth } from "../../common/middleware/auth.js";
import { upload } from "../../common/middleware/multer.js";
import { validation } from "../../common/middleware/validation.js";
import {
  createCategoryValidation,
  createProductValidation,
} from "./admin.validation.js";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  deleteUser,
  editCargetoies,
  editProducts,
  getAllProducts,
  getAllUsers,
} from "./admin.service.js";
import { isAdmin } from "../../common/middleware/isAdmin.js";
import { successResponce } from "../../common/responce/SuccessResponce.js";
import { getAllCategoties } from "../../module/admin/admin.service.js";
const router = Router();
// categories
router.get("/Categories", auth, isAdmin, async (req, res) => {
  const categories = await getAllCategoties();
  successResponce({
    res,
    status: 200,
    message: "Categories",
    data: categories,
  });
});

router.post(
  "/Category",
  validation(createCategoryValidation),
  upload().single("image"),
  auth,
  isAdmin,
  async (req, res) => {
    const image = req.file;

    const Categories = await createCategory(req.body, image);
    successResponce({
      res,
      status: 201,
      message: "Category created successfully",
      data: Categories,
    });
  },
);

router.patch(
  "/categories/:categoryId",
  upload().single("image"),
  validation(createCategoryValidation),
  auth,
  isAdmin,
  async (req, res) => {
    const { categoryId } = req.params;
    const image = req.file;
    const category = await editCargetoies(req.body, categoryId, image);
    successResponce({
      res,
      status: 200,
      message: "category updated successfully",
      data: category,
    });
  },
);

router.delete("/catrgory/:categoryId", auth, isAdmin, async (req, res) => {
  const { categoryId } = req.params;
  const deletedCategory = await deleteCategory(categoryId);
  successResponce({
    res,
    status: 200,
    message: "category deleted successfully",
    data: deletedCategory,
  });
});
//products

router.get("/products", auth, isAdmin, async (req, res) => {
  const Products = await getAllProducts();
  successResponce({
    res,
    status: 200,
    message: "Products",
    data: Products,
  });
});

router.post(
  "/products/:categoryId",
  upload().single("image"),
  validation(createProductValidation),
  auth,
  isAdmin,
  async (req, res) => {
    const user = req.user;
    const { categoryId } = req.params;
    const image = req.file;

    const products = await createProduct(user, req.body, categoryId, image);
    successResponce({
      res,
      status: 201,
      message: "product created successfully",
      data: products,
    });
  },
);

router.patch(
  "/products/:productId",
  upload().single("image"),
  validation(createProductValidation),
  auth,
  isAdmin,
  async (req, res) => {
    const { productId } = req.params;
    const image = req.file;
    const product = await editProducts(req.body, productId, image);
    successResponce({
      res,
      status: 200,
      message: "product updated successfully",
      data: product,
    });
  },
);

router.delete("/product/:productId", auth, isAdmin, async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await deleteProduct(productId);
  successResponce({
    res,
    status: 200,
    message: "product deleted successfully",
    data: deletedProduct,
  });
});

// users

router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await getAllUsers();
  successResponce({
    res,
    status: 200,
    message: "users: ",
    data: users,
  });
});

router.delete("/users/:userId", auth, isAdmin, async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await deleteUser(userId);
  successResponce({
    res,
    status: 200,
    message: "user deleted successfully",
    data: deletedUser,
  });
});
export default router;
