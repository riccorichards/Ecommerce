import { Express, Request, Response } from "express";
import { registerHandler } from "./controllers/auth.controller";
import {
  createSessionHandler,
  deleteUserSession,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { requestUser } from "./middleware/requestUser";
import { deserializeUser } from "./middleware/deserializeUser";
import {
  createMainCatHandler,
  deleteMainCatHandler,
  getAllMainCatHandler,
  getSpecificMainCatHandler,
  updateMainCatHandler,
} from "./controllers/mainCategory.controller";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";
import {
  createSubCatHandler,
  deleteSubCatHandler,
  getAllSubCatsHandler,
  getSpecificSubCatHandler,
  updateSubCatHandler,
} from "./controllers/subCategory.controller";
import {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getOrderHandler,
} from "./controllers/order.controller";
import {
  createOrderItemHandler,
  deleteOrderItemHandler,
  getAllOrderItemsHandler,
  getOrderItemHandler,
  updateOrderItemHandler,
} from "./controllers/orderItem.controller copy";
import {
  createProductReviewHandler,
  deleteProductReviewHandler,
  getAllProductReviewsHandler,
  getProductReviewHandler,
  updateProducReviewtHandler,
} from "./controllers/productReview.controller";
import { getSpecificProductReview } from "./services/productReview.services";
import {
  createWishlistHandler,
  deleteWishlistHandler,
  getAllWishlistsHandler,
  getWishlistHandler,
  updateWishlistHandler,
} from "./controllers/wishlist.controller";
const routes = (app: Express) => {
  app.get("/api/v1/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  //registration section
  app.post("/api/v1/auth", registerHandler);

  //session sesion with starting from login
  app.post("/api/v1/session", createSessionHandler);
  app.get(
    "/api/v1/session",
    [deserializeUser, requestUser],
    getUserSessionHandler
  );
  app.delete(
    "/api/v1/session",
    [deserializeUser, requestUser],
    deleteUserSession
  );

  //main category section
  app.get("/api/v1/main_cat", getAllMainCatHandler);
  app.get("/api/v1/main_cat/:_id", getSpecificMainCatHandler);
  app.post(
    "/api/v1/main_cat",
    [deserializeUser, requestUser],
    createMainCatHandler
  );
  app.put(
    "/api/v1/main_cat/:_id",
    [deserializeUser, requestUser],
    updateMainCatHandler
  );
  app.delete(
    "/api/v1/main_cat/:_id",
    [deserializeUser, requestUser],
    deleteMainCatHandler
  );

  //product section
  app.get("/api/v1/products", getAllProductsHandler);
  app.get("/api/v1/product/:_id", getProductHandler);
  app.post(
    "/api/v1/product",
    [deserializeUser, requestUser],
    createProductHandler
  );
  app.put(
    "/api/v1/product/:_id",
    [deserializeUser, requestUser],
    updateProductHandler
  );
  app.delete(
    "/api/v1/product/:_id",
    [deserializeUser, requestUser],
    deleteProductHandler
  );

  //sub category section
  app.get("/api/v1/subCats", getAllSubCatsHandler);
  app.get("/api/v1/subCat/:_id", getSpecificSubCatHandler);
  app.post(
    "/api/v1/subCat",
    [deserializeUser, requestUser],
    createSubCatHandler
  );
  app.put(
    "/api/v1/subCat/:_id",
    [deserializeUser, requestUser],
    updateSubCatHandler
  );
  app.delete(
    "/api/v1/subCat/:_id",
    [deserializeUser, requestUser],
    deleteSubCatHandler
  );

  //order section
  app.get("/api/v1/orders", getAllOrdersHandler);
  app.get("/api/v1/order/:_id", getOrderHandler);
  app.post("/api/v1/order", [deserializeUser, requestUser], createOrderHandler);
  app.delete(
    "/api/v1/order/:_id",
    [deserializeUser, requestUser],
    deleteOrderHandler
  );

  //order item section
  app.get("/api/v1/orderItems", getAllOrderItemsHandler);
  app.get("/api/v1/orderItem/:_id", getOrderItemHandler);
  app.post(
    "/api/v1/orderItem",
    [deserializeUser, requestUser],
    createOrderItemHandler
  );
  app.put(
    "/api/v1/orderItem/:_id",
    [deserializeUser, requestUser],
    updateOrderItemHandler
  );
  app.delete(
    "/api/v1/orderItem/:_id",
    [deserializeUser, requestUser],
    deleteOrderItemHandler
  );

  //product review section
  app.get("/api/v1/product_reviews", getAllProductReviewsHandler);
  app.get("/api/v1/product_review/:_id", getProductReviewHandler);
  app.post(
    "/api/v1/product_review",
    [deserializeUser, requestUser],
    createProductReviewHandler
  );
  app.put(
    "/api/v1/product_review/:_id",
    [deserializeUser, requestUser],
    updateProducReviewtHandler
  );
  app.delete(
    "/api/v1/product_review/:_id",
    [deserializeUser, requestUser],
    deleteProductReviewHandler
  );

  //wishlist review section
  app.get("/api/v1/wishlists", getAllWishlistsHandler);
  app.get("/api/v1/wishlist/:_id", getWishlistHandler);
  app.post(
    "/api/v1/wishlist",
    [deserializeUser, requestUser],
    createWishlistHandler
  );
  app.put(
    "/api/v1/wishlist/:_id",
    [deserializeUser, requestUser],
    updateWishlistHandler
  );
  app.delete(
    "/api/v1/wishlist/:_id",
    [deserializeUser, requestUser],
    deleteWishlistHandler
  );
};

export default routes;
