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
  getAllProducts,
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
  validation(createProductValidation),
  upload().single("image"),
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

export default router;
