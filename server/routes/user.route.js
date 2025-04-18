import { Router } from "express"
import { register,login, getUserProfile, logout, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../Middleware/isAuthenticated.js";
import upload from "../utils/multer.js"
const router = Router()
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile").get(isAuthenticated,getUserProfile)
router.route("/profile/update").put(isAuthenticated, upload.single("profile"), updateProfile);
export default router