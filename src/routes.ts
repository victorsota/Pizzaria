import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

const router = Router();

const upload = multer(uploadConfig.upload("./temp"));

//Rotas de Usuario
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//Rotas de Categoria
router.post(
  "/categories",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get("/categories", isAuthenticated, new ListCategoryController().handle);
export { router };

// Rotas de produtos
router.post(
  "/products",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
router.get(
  "/categories/products",
  isAuthenticated,
  new ListByCategoryController().handle
);
