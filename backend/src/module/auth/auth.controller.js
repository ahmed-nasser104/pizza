import Router from "express";
import { validation } from "../../common/middleware/validation.js";
import { signUpSchema } from "./auth.validation.js";
import { login, signUp, verifyAccount } from "./auth.service.js";
import { successResponce } from "../../common/responce/SuccessResponce.js";
const router = Router();
router.post("/sign", validation(signUpSchema), async (req, res) => {
  const user = await signUp(req.body);
  successResponce({
    res,
    status: 201,
    message: "user created successfully",
    data: user,
  });
});
router.post("/verify", async (req, res) => {
  const user = await verifyAccount(req.body);
  successResponce({
    res,
    status: 200,
    message: "Account verified successfully",
    data: user,
  });
});
router.post("/login", async (req, res) => {
  const host = req.get("host");
  const user = await login(req.body, host);
  successResponce({
    res,
    status: 200,
    message: "login successfully",
    data: user,
  });
});
export default router;
