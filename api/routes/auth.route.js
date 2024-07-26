import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

// 1) Router oluşturma
const router = express.Router();

// 2) Yolların belirlenmesi
router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

// 3) App'e tanıtmak için export et
export default router;
